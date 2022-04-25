
export const roleList=['kanna','girl1']
export const poseList=['untitled','idle','walking','left','right','back','jump','run','sit']
export const getRoleAnimetions=(role:string)=>{
  const animetions:any={}
  for(let v of poseList){
    animetions[v]=`${role}/${v}.fbx`
   }
   return animetions
}
export const getRoleModel=():Array<string>=>{
  let roleModel:Array<string>=[]
  for(let v of roleList ){
     for(let k of poseList){
      roleModel.push(`${v}/${k}.fbx`)
     }
  }
  return roleModel
}