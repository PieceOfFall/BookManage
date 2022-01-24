# -
图书管理系统
#		 图书管理系统（ Vue.js  +  Node.js  +  Mysql ）



##		      技术栈:

```
Html
Css
Javascript (ES6)
Vue.js
Express
Mysql
```

##			项目介绍:

​		该项目制作的初衷是完成数据库课程实践布置的大作业--万恶的管理系统。还听说代做大作业少说要五六百软妹币，这简直令人发指（震声）。本着减小同学们的作业成本，且正好用项目练练手的想法，耗时一周完成图书馆最基本的功能。前段时间正好Log4j2曝出有重大漏洞，因此后端不采用SpringBoot来做（其实只是想偷懒）。		

​		在完成基本功能的前提之下，我在不停追求着管理系统的安全性，从防sql注入，到用户和管理员密码MD5加密，到接口权限拦截，到页面路由拦截（采用JsonWebToken），登录校验，登录超时拦截，并且为了将系统的并发能力在有限资源的情况下提到极致，创建了数据库连接池，以事务的方式代替外查询来避免带来的高并发时产生死锁的可能性。

###		登录界面



[![THNdx0.md.png](https://s4.ax1x.com/2022/01/03/THNdx0.md.png)](https://imgtu.com/i/THNdx0)

###		用户界面

[![THNya4.md.png](https://s4.ax1x.com/2022/01/03/THNya4.md.png)](https://imgtu.com/i/THNya4)



[![THNgi9.md.png](https://s4.ax1x.com/2022/01/03/THNgi9.md.png)](https://imgtu.com/i/THNgi9)

##			项目运行：

​		该项目运行只需在官网 https://nodejs.org/zh-cn/ 安装node.js ，并且安装mysql。

###					数据库

​			打开cmd,输入

```mysql
mysql -u root -p
```

​			回车，输入密码，回车后登入数据库，输入

```mysql
CREATE DATABASE book_manage;
use book_manage;
```

​			来创建数据库，打开项目文件夹中book_manage.sql，全选后复制到刚刚的cmd，回车运行，数据库初始化完成！

###					前端

​				打开cmd,进入到项目的根目录，输入

```powershell
npm i
```

​				等待相关依赖安装完成后输入 

```powershell
npm run serve 
```

​				前端运行成功，控制台会有

```powershell
  App running at:
  - Local:   http://localhost:8081/
  - Network: http://192.168.2.18:8081/

  Note that the development build is not optimized.
  To create a production build, run npm run build.
```

​				开始准备运行后端

###					后端

​				原有的cmd不要关闭，重新一个打开cmd，进入到项目根目录，输入

```powershell
npm i
```

​				待依赖安装完成后,进入database文件夹下的index.js ,修改为你的数据库配置（密码等）

​				修改成功后进入middleware文件夹下的mail.js，第三行的authUser修改为你的qq邮箱账号 ， 第四行的authPass修改为你的qq邮箱授权码。（如何获得qq邮箱授权码：https://jingyan.baidu.com/article/0a52e3f40acd38fe62ed72ec.html）

​				返回cmd,输入

```powershell
node app
```

​				项目启动成功 ！访问前端cmd给的这两个网站之一

```powershell
  - Local:   http://localhost:8081/
  - Network: http://192.168.2.18:8081/
```

###		管理员账号密码  （ 普通用户账号可以在登录界面自行注册 ）

```用户提交借书请求后需要管理员同意才能借阅到，管理员账号可以用另一个浏览器打开网站登录使用```

账号：admin_FALL   密码（password）:123456

账号：admin_ZDF    密码（password）:123456

##		常见问题

​		由于 Mysql8 之前的版本中加密规则是mysql_[native]password,而在 Mysql8 之后,加密规则是caching_sha2_password,如果后端连接数据库失败，请先用管理员模式打开cmd（如果前后端运行起来后功能一切正常，则跳过这一步） 输入

```powershell
mysql -u root -p
```

​		回车，输入密码，回车

​		成功登入mysql , 然后输入

```mysql
ALTER USER 'root'@'%' IDENTIFIED BY '12345678(此处输入你的mysql密码)' PASSWORD EXPIRE NEVER;
```

​		回车，成功后输入

```mysql
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456(此处输入你的mysql密码)';
```

​		回车，刷新权限，使修改生效。

```mysql
FLUSH PRIVILEGES;
```

​		然后叉掉原来的后端cmd ,新建一个后端使用的cmd,重复后端运行的步骤即可！

 



