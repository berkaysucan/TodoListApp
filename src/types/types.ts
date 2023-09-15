type ListType = 
{
    task:string,
    checked:boolean,
    _id?: string; // MongoDB tarafından otomatik olarak atanan ObjectId

}

export default ListType;