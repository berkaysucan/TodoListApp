// MongoDB kullanarak kullanıcı kimlik doğrulama örneği
import mongoose from 'mongoose';

// MongoDB veritabanı bağlantısı
mongoose.connect(`${process.env.DB_HOST}`);


  
// Kullanıcı Modeli
const todoSchema = new mongoose.Schema({
    task: String,
    checked: Boolean,
    
  });

export const todoList = mongoose.models.todoList || mongoose.model('todoList', todoSchema);


module.exports = { todoList };