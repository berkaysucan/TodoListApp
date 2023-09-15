import { todoList } from '@/database/database';

export async function GET(request: Request) {
  try {
    const data = await todoList.find();
    const jsonData = JSON.stringify(data);
    return new Response(jsonData, {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Handle errors 
    return new Response('An error occurred', { status: 500 });
  }
}

export async function POST(request: Request) {

  try {
    const data = await request.json(); // Parse JSON

    
    console.log("post request");
    const newItem = new todoList({
      task:data.task,
      checked:data.checked,
    });
    newItem.save();
    
    console.log(data);
    // Send a response to acknowledge receipt
    return new Response('Data received successfully', { status: 200 });
  } catch (error) {
    // Handle errors 
    console.error(error);
    return new Response('An error occurred', { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();// Parse JSON

   

    

    const existingItem = await todoList.findById(data.v_id);
    existingItem.checked = !existingItem.checked;
    await existingItem.save();
    
    
    // Send a response to acknowledge receipt
    return new Response('Data received successfully', { status: 200 });
  } catch (error) {
    // Handle errors 
    console.error(error);
    return new Response('An error occurred', { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const data = await request.json();// Parse JSON

     

    const result = await todoList.findByIdAndRemove(data.v_id);
    
    // Send a response 
    return new Response('Data received successfully', { status: 200 });
  } catch (error) {
    // Handle errors 
    console.error(error);
    return new Response('An error occurred', { status: 500 });
  }
}