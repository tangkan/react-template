import { useState } from "react";
import "./App.css";

// 写
const WRITE = 0b00000001;
// 读
const READ = 0b00000010;
// 删
const DELETE = 0b00000100;
// 创建
const CREATE = 0b00001000;

// 创建角色

// 学生：读、写功能
const STUDENTS = WRITE | READ;

// 教师：读、写、创建功能
const TEACHERS = WRITE | READ | CREATE;

// 校长：最高权限
const PRINCIPAL = WRITE | READ | DELETE | CREATE;

// 判断是否含有某个权限
const hasPermission = (role: number, permisstion: number) =>
  (role & permisstion) === permisstion;

// 添加权限
const addPermission = (role: number, permission: number) => role | permission;

// 删除权限
const removePermission = (role: number, premission: number) =>
  role & ~premission;

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <button>编辑</button>
    </div>
  );
}

export default App;
