![cover][1]
### 注册系统

 - 在cmd输入node signin.js后在端口8000打开
 - 已有3个已注册用户：

> 1. username:  a123456
> 	  studentid: 12345678
> 	  telephone: 12345678901
> 	  email:     a@qq.com
> 2. username:  b123789
> 	  studentid: 22222222
> 	  telephone: 22222222222
> 	  email:     bbb@qq.com
> 3. username:  zmj1997
> 	  studentid: 15331398
> 	  telephone: 15521101359
> 	  email:     295692590@qq.com

- 输入形如http://localhost:8000?username=abc 时，如果abc是已注册用户，显示“详情”，否则回到注册页面
- 其它情况均显示“注册”界面
- “注册”界面点击“重置”，清空表单所有内容
- “注册”界面点击“提交”，成功则跳转到对应用户的“详情”界面，不成功则回到注册界面，并高亮错误原因
- 用户信息储存在info.JSON中


  [1]: cover.png "cover.png"