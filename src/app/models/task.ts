export class Task{
    id:number;
    title: string;
    status: string;
    $key?: string;
}
export interface ITask {
  $key?: string;
  status: boolean;
  title: string;
  id: number;
}