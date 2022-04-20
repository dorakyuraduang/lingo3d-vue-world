import Recorder from 'recorder-core/recorder.wav.min'
import socket from '@/utils/socket'
import state from '@/store'
import useUserStore from '@/store/modules/player'
const userStore = useUserStore()
let rec:any;
let SendInterval:number=300 //发送间隔
let sampleRate:number=16000 //采样率
let bitRate:number=16  //比特率
let realTimeSendTryEncBusy:number
let realTimeSendTryTime:number=0 //发送时间
let realTimeSendTryNumber:number //发送数量
let transferUploadNumberMax:number //最大传输上传数量
let realTimeSendTryChunk:any //实时发送块
const RealTimeSendTry=(rec:any,isClose:boolean)=>{ //实时发送函数
	let t1:number=Date.now(); //当前时间
  let endT=0 //结束时间
	if(realTimeSendTryTime==0){ //初始化
		realTimeSendTryTime=t1;
		realTimeSendTryEncBusy=0;
		realTimeSendTryNumber=0;
		transferUploadNumberMax=0;
		realTimeSendTryChunk=null;
	};
	if(!isClose && t1-realTimeSendTryTime<SendInterval){
		return;//控制缓冲达到指定间隔才进行传输
	};
	realTimeSendTryTime=t1; //
	let number=++realTimeSendTryNumber; //发送数量增加
	
	//借用SampleData函数进行数据的连续处理，采样率转换是顺带的
	let chunk=Recorder.SampleData(rec.buffers,rec.srcSampleRate,sampleRate,realTimeSendTryChunk,{frameType:isClose?"":"wav"});
	
	//清理已处理完的缓冲数据，释放内存以支持长时间录音，最后完成录音时不能调用stop，因为数据已经被清掉了
	for(let i=realTimeSendTryChunk?realTimeSendTryChunk.index:0;i<chunk.index;i++){
		rec.buffers[i]=null;
	};
	realTimeSendTryChunk=chunk;//此时的chunk.data就是原始的音频pcm数据，直接保存即为pcm文件、加个wav头即为wav文件、丢给mp3编码器转一下码即为mp3文件
	
	//没有新数据，或结束时的数据量太小，不能进行mock转码
	if(chunk.data.length==0 || isClose&&chunk.data.length<2000){
		TransferUpload(number,null,0,null,isClose);
		return;
	};
	
	//实时编码队列阻塞处理
	if(!isClose){
		if(realTimeSendTryEncBusy>=2){
			return;
		};
	};
	realTimeSendTryEncBusy++;
	
	//通过mock方法实时转码成mp3、wav；pcm格式可以不经过此操作，直接发送chunk.data
	let encStartTime=Date.now();
	let recMock=Recorder({
		type:'wav'
		,sampleRate //采样率
		,bitRate //比特率
	});
	recMock.mock(chunk.data,chunk.sampleRate);
	recMock.stop(function(blob:any,duration:number){
		realTimeSendTryEncBusy&&(realTimeSendTryEncBusy--);
		blob.encTime=Date.now()-encStartTime;
		//转码好就推入传输
		TransferUpload(number,blob,duration,recMock,isClose);
	},function(msg:string){
		realTimeSendTryEncBusy&&(realTimeSendTryEncBusy--);
    console.log('出现错误'+msg)
	});
};
//=====数据传输函数==========
const TransferUpload=(number:number,blobOrNull:any|null,duration:any,blobRec:any,isClose:Boolean)=>{
	transferUploadNumberMax=Math.max(transferUploadNumberMax,number);
	if(blobOrNull){
		var blob=blobOrNull;
		var encTime=blob.encTime;
		var reader=new FileReader();
		reader.readAsDataURL(blob);
    socket.emit('audio',{blob,id: userStore.id})
	};
};
export  function recStart(){
	if(rec){
		rec.close();
	};
	rec=Recorder({
		type:"unknown"
		,onProcess:function(){
			RealTimeSendTry(rec,false);//推入实时处理，因为是unknown格式，这里简化函数调用，没有用到buffers和bufferSampleRate，因为这些数据和rec.buffers是完全相同的。
		}
	});
	
	rec.open(()=>{//打开麦克风授权获得相关资源
		rec.start();//开始录音
		realTimeSendTryTime=0;//重置
	});
};
export function recStop(){
	rec.close();//直接close掉即可，这个例子不需要获得最终的音频文件
	RealTimeSendTry(rec,true);//最后一次发送
};
