export interface CommentModel{
    id: number,
    text: string,
    task_id: number, 
    user_id: number,
    create_date: Date
}


// interface HumanInterface{
//     name:string,
//     speak:()=>string,
// }


// class Human implements HumanInterface{
//     name:string;
//     constructor(name:string){
//         this.name = name;

//     }

//      speak():string  {
//         return "Hi"
//     }
// }