//基本类型
let a: string = "hello world";
let b: number = 18;
let c: boolean = true;

//函数
function count(x: number, y: number): number {
  return x + y;
}
let result = count(1, 2);
console.log(result);

//断言
let w: string;
let m: unknown;
//1.
if (typeof m === "string") {
  w = m;
}
//2.断言
w = m as string;
//3.断言
w = <string>m;

//Object
let person: {
  name: string;
  age: number;
  [index: string]: any;
  //索引签名，允许定义对象可以拥有任意数量的属性，这些键的属性和类型都是可变的
};
person = {
  name: "camellia",
  age: 18,
  gender: "female",
};

//数组
let arr1: string[];
let arr2: Array<number>; //泛型

arr1 = ["a", "b"];
arr2 = [100, 200];
console.log(arr1);
console.log(arr2);

//元组 tuple
let arr3: [string, number?, ...number[]];
//? 可选参数   ...number[]  任意数量的参数，类型为number

//枚举 enum 定义一组常量
enum Color {
  Red,
  Green,
  Blue,
}
//常量枚举,在编译时会被内联（ts在编译时会将美剧成员引用替换成他们的实际值，而不是生成额外的enum对象），避免生成额外的代码
const Color2 = {
  Red: "red",
  Green: "green",
  Blue: "blue",
};
//type 定义新的类型
type Status = number | string; //联合类型：或
type Area = {
  //交叉类型：和
  height: number;
  width: number;
};
//错误的
type Demo = number & string;
// 交叉类型：和，必须同时是number和string，否则会报错;但是不可能既是number又是string，所以显示never类型

//类
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  speak() {
    console.log(`我叫:${this.name},今年${this.age}岁`);
  }
}
const p1 = new Person("张三", 18);
p1.speak();

//继承
class Student extends Person {
  grade: string;
  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }
  study() {
    console.log(`${this.name}正在学习`);
  }
  override speak() {
    console.log(`我是${this.grade}学生,我叫:${this.name},今年${this.age}岁`);
  }
}
const s1 = new Student("李四", 18, "高中");
s1.study();
s1.speak();

//简写前
// class Person1 {
//   public name: string ;
//   public age: number ;
//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }
// }
//简写后
class Person1 {
  constructor(
    public name: string,
    public age: number,
  ) {}
}

// public 修饰符
// public 修饰符表示属性或方法可以在类的外部访问
// private 修饰符表示属性或方法只能在类的内部访问
// protected 修饰符表示属性或方法可以在类的内部和派生类中访问
// readonly 修饰符表示属性只能在类的内部初始化，不能在外部修改

//泛型
function logData<T, U>(data1: T, data2: U): T | U {
  console.log(data1, data2);
  return data1;
  // return data2;
}
logData<string, number>("hello", 18);
logData<boolean, string>(true, "hello");

//装饰器
// 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
// 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
// 参数装饰器应用到构造函数。
// 类装饰器应用到类
