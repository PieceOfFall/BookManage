/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : 127.0.0.1:3306
 Source Schema         : book_manage

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 03/01/2022 14:36:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book`  (
  `book_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `book_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `statement` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `due` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`book_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES ('0', '欢乐', '莫言', '一本好书', 'available', '');
INSERT INTO `book` VALUES ('1', '球状闪电', '刘慈欣', '一本科幻书', 'available', '');
INSERT INTO `book` VALUES ('10', 'MyBatis', 'ORM框架', NULL, 'available', NULL);
INSERT INTO `book` VALUES ('11', 'Spring', 'Java框架', NULL, 'available', NULL);
INSERT INTO `book` VALUES ('12', 'mysql', '出版社', 'MySQL 是最流行的关系型数据库管理系统，在 WEB 应用方面 MySQL 是最好的 RDBMS(Relational Database Management System：关系数据库管理系统)应用软件之一。', 'available', '');
INSERT INTO `book` VALUES ('13', 'Node.js', '服务端js', '', 'available', '');
INSERT INTO `book` VALUES ('14', '两只老虎', '未知', '', 'available', '');
INSERT INTO `book` VALUES ('15', 'java程序设计', '尚学堂', 'Java 是由 Sun Microsystems 公司于 1995 年 5 月推出的高级程序设计语言。\r\n\r\nJava 可运行于多个平台，如 Windows, Mac OS 及其他多种 UNIX 版本的系统。', 'available', '');
INSERT INTO `book` VALUES ('16', 'Java程序设计', '尚学堂', '专注于Java程序开发', 'available', '');
INSERT INTO `book` VALUES ('17', 'Java程序设计', '尚明谷', 'Java 是由 Sun Microsystems 公司于 1995 年 5 月推出的高级程序设计语言。\r\n\r\nJava 可运行于多个平台，如 Windows, Mac OS 及其他多种 UNIX 版本的系统。', 'available', '');
INSERT INTO `book` VALUES ('18', 'Java程序设计', '尚硅谷', 'Java 是由 Sun Microsystems 公司于 1995 年 5 月推出的高级程序设计语言。\r\n\r\nJava 可运行于多个平台，如 Windows, Mac OS 及其他多种 UNIX 版本的系统。', 'available', '');
INSERT INTO `book` VALUES ('19', 'Java程序设计', '尚硅谷', 'Java 是由 Sun Microsystems 公司于 1995 年 5 月推出的高级程序设计语言。\r\n\r\nJava 可运行于多个平台，如 Windows, Mac OS 及其他多种 UNIX 版本的系统。', 'available', '');
INSERT INTO `book` VALUES ('2', '高等数学', '同济', '高等数学是指相对于初等数学和中等数学而言，数学的对象及方法较为繁杂的一部分，中学的 代数 、 几何 以及简单的 集合论 初步、 逻辑 初步称为 中等数学 ，将其作为中小学阶段的初等数学与大学阶段的高等数学的过渡。 通常认为，高等数学是由 微积分学 ，较深入的 代数 学、 几何学 以及它们之间的交叉内容所形成的一门基础学科。 主要内容包括： 数列 、 极限 、 微积分 、 空间解析几何 与 线性代数 、 级数 、 常微分方程 。 工科 、 理科 、 财经 类研究生考试的基础科目。 通常认为，高等数学是由17', 'wait_check_Qa0_awJi8PsiqM-FUwE1R', '');
INSERT INTO `book` VALUES ('20', 'Java程序设计', '尚硅谷', 'Java 是由 Sun Microsystems 公司于 1995 年 5 月推出的高级程序设计语言。\r\n\r\nJava 可运行于多个平台，如 Windows, Mac OS 及其他多种 UNIX 版本的系统。', 'available', '');
INSERT INTO `book` VALUES ('21', 'Java程序设计', '尚硅谷', 'Java 是由 Sun Microsystems 公司于 1995 年 5 月推出的高级程序设计语言。\r\n\r\nJava 可运行于多个平台，如 Windows, Mac OS 及其他多种 UNIX 版本的系统。', 'available', '');
INSERT INTO `book` VALUES ('22', '高等数学', '同济大学', '高等数学是指相对于初等数学和中等数学而言，数学的对象及方法较为繁杂的一部分，中学的 代数 、 几何 以及简单的 集合论 初步、 逻辑 初步称为 中等数学 ，将其作为中小学阶段的初等数学与大学阶段的高等数学的过渡。 通常认为，高等数学是由 微积分学 ，较深入的 代数 学、 几何学 以及它们之间的交叉内容所形成的一门基础学科。 主要内容包括： 数列 、 极限 、 微积分 、 空间解析几何 与 线性代数 、 级数 、 常微分方程 。 工科 、 理科 、 财经 类研究生考试的基础科目。 通常认为，高等数学是由17', 'available', '');
INSERT INTO `book` VALUES ('23', '高等数学', '同济大学', '高等数学是指相对于初等数学和中等数学而言，数学的对象及方法较为繁杂的一部分，中学的 代数 、 几何 以及简单的 集合论 初步、 逻辑 初步称为 中等数学 ，将其作为中小学阶段的初等数学与大学阶段的高等数学的过渡。 通常认为，高等数学是由 微积分学 ，较深入的 代数 学、 几何学 以及它们之间的交叉内容所形成的一门基础学科。 主要内容包括： 数列 、 极限 、 微积分 、 空间解析几何 与 线性代数 、 级数 、 常微分方程 。 工科 、 理科 、 财经 类研究生考试的基础科目。 通常认为，高等数学是由17', 'available', '');
INSERT INTO `book` VALUES ('24', '高等数学', '同济大学', '高等数学是指相对于初等数学和中等数学而言，数学的对象及方法较为繁杂的一部分，中学的 代数 、 几何 以及简单的 集合论 初步、 逻辑 初步称为 中等数学 ，将其作为中小学阶段的初等数学与大学阶段的高等数学的过渡。 通常认为，高等数学是由 微积分学 ，较深入的 代数 学、 几何学 以及它们之间的交叉内容所形成的一门基础学科。 主要内容包括： 数列 、 极限 、 微积分 、 空间解析几何 与 线性代数 、 级数 、 常微分方程 。 工科 、 理科 、 财经 类研究生考试的基础科目。 通常认为，高等数学是由17', 'available', '');
INSERT INTO `book` VALUES ('25', '高等数学', '安徽农业大学', '高等数学是指相对于初等数学和中等数学而言，数学的对象及方法较为繁杂的一部分，中学的 代数 、 几何 以及简单的 集合论 初步、 逻辑 初步称为 中等数学 ，将其作为中小学阶段的初等数学与大学阶段的高等数学的过渡。 通常认为，高等数学是由 微积分学 ，较深入的 代数 学、 几何学 以及它们之间的交叉内容所形成的一门基础学科。 主要内容包括： 数列 、 极限 、 微积分 、 空间解析几何 与 线性代数 、 级数 、 常微分方程 。 工科 、 理科 、 财经 类研究生考试的基础科目。 通常认为，高等数学是由17', 'available', '');
INSERT INTO `book` VALUES ('26', '大学英语1', '北京大学出版社', '大学英语四六级考试口语考试每年举行2次（6月和12月)\r\n改革后的全国大学英语四、六级考试，四级成绩为550分以上（含550 分）或六级成绩为520分以上（含520分）。 [1] \r\n2014年11月进行的全国大学英语四、六级口语考试的报考条件发生了变化：2005年6月及以后的纸笔或网考四级成绩为500分以上（含500分），或六级成绩为425分以上（含425分）即可报考。\r\n口语考试成绩合格者由教育部高等教育司发给证书，证书分为 A 、 B 、 C 、D三个等级，成绩为D等的不发给证书 。', 'available', '');
INSERT INTO `book` VALUES ('27', '大学英语1', '北京大学出版社', '大学英语四六级考试口语考试每年举行2次（6月和12月)\r\n改革后的全国大学英语四、六级考试，四级成绩为550分以上（含550 分）或六级成绩为520分以上（含520分）。 [1] \r\n2014年11月进行的全国大学英语四、六级口语考试的报考条件发生了变化：2005年6月及以后的纸笔或网考四级成绩为500分以上（含500分），或六级成绩为425分以上（含425分）即可报考。\r\n口语考试成绩合格者由教育部高等教育司发给证书，证书分为 A 、 B 、 C 、D三个等级，成绩为D等的不发给证书 。', 'available', '');
INSERT INTO `book` VALUES ('28', '大学英语1', '北京大学出版社', '大学英语四六级考试口语考试每年举行2次（6月和12月)\r\n改革后的全国大学英语四、六级考试，四级成绩为550分以上（含550 分）或六级成绩为520分以上（含520分）。 [1] \r\n2014年11月进行的全国大学英语四、六级口语考试的报考条件发生了变化：2005年6月及以后的纸笔或网考四级成绩为500分以上（含500分），或六级成绩为425分以上（含425分）即可报考。\r\n口语考试成绩合格者由教育部高等教育司发给证书，证书分为 A 、 B 、 C 、D三个等级，成绩为D等的不发给证书 。', 'available', '');
INSERT INTO `book` VALUES ('29', '考研英语', '星火', '大学英语四六级考试口语考试每年举行2次（6月和12月)\r\n改革后的全国大学英语四、六级考试，四级成绩为550分以上（含550 分）或六级成绩为520分以上（含520分）。 [1] \r\n2014年11月进行的全国大学英语四、六级口语考试的报考条件发生了变化：2005年6月及以后的纸笔或网考四级成绩为500分以上（含500分），或六级成绩为425分以上（含425分）即可报考。\r\n口语考试成绩合格者由教育部高等教育司发给证书，证书分为 A 、 B 、 C 、D三个等级，成绩为D等的不发给证书 。', 'available', '');
INSERT INTO `book` VALUES ('3', '高等数学', '安农', '高等数学是指相对于初等数学和中等数学而言，数学的对象及方法较为繁杂的一部分，中学的 代数 、 几何 以及简单的 集合论 初步、 逻辑 初步称为 中等数学 ，将其作为中小学阶段的初等数学与大学阶段的高等数学的过渡。 通常认为，高等数学是由 微积分学 ，较深入的 代数 学、 几何学 以及它们之间的交叉内容所形成的一门基础学科。 主要内容包括： 数列 、 极限 、 微积分 、 空间解析几何 与 线性代数 、 级数 、 常微分方程 。 工科 、 理科 、 财经 类研究生考试的基础科目。 通常认为，高等数学是由17', 'available', '');
INSERT INTO `book` VALUES ('30', 'MySQL', '数据库', 'MySQL 是最流行的关系型数据库管理系统，在 WEB 应用方面 MySQL 是最好的 RDBMS(Relational Database Management System：关系数据库管理系统)应用软件之一。', 'available', '');
INSERT INTO `book` VALUES ('31', 'Mysql', '出版社', 'MySQL 是最流行的关系型数据库管理系统，在 WEB 应用方面 MySQL 是最好的 RDBMS(Relational Database Management System：关系数据库管理系统)应用软件之一。', 'available', '');
INSERT INTO `book` VALUES ('32', 'Mysql', '出版社', 'MySQL 是最流行的关系型数据库管理系统，在 WEB 应用方面 MySQL 是最好的 RDBMS(Relational Database Management System：关系数据库管理系统)应用软件之一。', 'available', '');
INSERT INTO `book` VALUES ('33', 'Mysql', '出版社', 'MySQL 是最流行的关系型数据库管理系统，在 WEB 应用方面 MySQL 是最好的 RDBMS(Relational Database Management System：关系数据库管理系统)应用软件之一。', 'available', '');
INSERT INTO `book` VALUES ('4', '四六级英语', '星火', NULL, 'available', '');
INSERT INTO `book` VALUES ('5', '大学英语1', '北京', '大学英语四六级考试口语考试每年举行2次（6月和12月)\r\n改革后的全国大学英语四、六级考试，四级成绩为550分以上（含550 分）或六级成绩为520分以上（含520分）。 [1] \r\n2014年11月进行的全国大学英语四、六级口语考试的报考条件发生了变化：2005年6月及以后的纸笔或网考四级成绩为500分以上（含500分），或六级成绩为425分以上（含425分）即可报考。\r\n口语考试成绩合格者由教育部高等教育司发给证书，证书分为 A 、 B 、 C 、D三个等级，成绩为D等的不发给证书 。', 'available', '');
INSERT INTO `book` VALUES ('6', '大学英语2', '北京', '大学英语四六级考试口语考试每年举行2次（6月和12月)\r\n改革后的全国大学英语四、六级考试，四级成绩为550分以上（含550 分）或六级成绩为520分以上（含520分）。 [1] \r\n2014年11月进行的全国大学英语四、六级口语考试的报考条件发生了变化：2005年6月及以后的纸笔或网考四级成绩为500分以上（含500分），或六级成绩为425分以上（含425分）即可报考。\r\n口语考试成绩合格者由教育部高等教育司发给证书，证书分为 A 、 B 、 C 、D三个等级，成绩为D等的不发给证书 。', 'available', '');
INSERT INTO `book` VALUES ('7', '高斯定理', '未知', '某物理学定理', 'available', '');
INSERT INTO `book` VALUES ('8', 'Vue', '前端三大框架', NULL, 'available', NULL);
INSERT INTO `book` VALUES ('9', 'Mysql', '数据库', 'MySQL 是最流行的关系型数据库管理系统，在 WEB 应用方面 MySQL 是最好的 RDBMS(Relational Database Management System：关系数据库管理系统)应用软件之一。', 'available', NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `mail_num` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `stu_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `hasBook` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('admin_FALL', 'FALL', 'e10adc3949ba59abbe56e057f20f883e', 'admin_FALL', 'admin', '');
INSERT INTO `user` VALUES ('admin_ZDF', 'ZDF', 'e10adc3949ba59abbe56e057f20f883e', 'admin_ZDF', 'admin', '');

SET FOREIGN_KEY_CHECKS = 1;
