
var gulp=require('gulp'),  //gulp基础库
    minifycss=require('gulp-minify-css'),   //css压缩
    concat=require('gulp-concat'),   //合并文件
    uglify=require('gulp-uglify'),   //js压缩
    rename=require('gulp-rename'),   //文件重命名
    jshint=require('gulp-jshint'),   //js检查
    notify=require('gulp-notify'),   //提示
    webserver = require('gulp-webserver'), //webserver
    connect = require("gulp-connect"),      //connect
    htmlmin = require("gulp-htmlmin"),      //html压缩
    imagemin=require('gulp-imagemin');      //image压缩



//css合并压缩处理
gulp.task('minifycss',function(){
     return gulp.src('css/*.css')                 //设置css *代表合并并压缩css文件夹下所有css文件
         .pipe(concat('style.css'))                  //合并css文件到"style.css"
         //.pipe(gulp.dest('newCss'))            //输出路径  [合并文件]
         .pipe(rename({suffix:'.min'}))              //修改文件名添加.min后缀
         .pipe(minifycss())                          //压缩文件
         .pipe(gulp.dest('onlineRetailers/css'))                //输出路径  [压缩文件]
         .pipe(notify({message:'css task ok'}));     //提示成功
});


 //JS合并压缩处理
gulp.task('minifyjs',function(){
     return gulp.src("js/*.js")           //选择合并的JS文件
         .pipe(concat('script.js'))                 //合并js
         //.pipe(gulp.dest('newJs'))           //输出路径  [合并文件]
         .pipe(rename({suffix:'.min'}))            //重命名
         .pipe(uglify())                           //压缩
         .pipe(gulp.dest('onlineRetailers/js'))           //输出路径  [压缩文件]
         .pipe(notify({message:"ok"}));    //提示
 });





// 压缩html文件

gulp.task('testHtmlmin', function () {
 var options = {
 removeComments: true,                   //清除HTML注释
 collapseWhitespace: true,               //压缩HTML
 collapseBooleanAttributes: true,        //省略布尔属性的值      <input checked="true"/> ==> <input />
 removeEmptyAttributes: true,            //删除所有空格作属性值  <input id="" /> ==> <input />
 removeScriptTypeAttributes: true,       //删除<script>的type="text/javascript"
 removeStyleLinkTypeAttributes: true,    //删除<style>和<link>的type="text/css"
 minifyJS: true,                         //压缩页面JS
 minifyCSS: true                         //压缩页面CSS
 };
 gulp.src('index.html')
 .pipe(htmlmin(options))                 //压缩html
 .pipe(gulp.dest('onlineRetailers'));      //输出目录  [压缩文件]
 });




//压缩图片文件

gulp.task('imagemin', function () {
 gulp.src('images/imgs/*.*')  //被压缩文件的路径，与js/css/html 同理可传数组指定文件
 .pipe(imagemin({
 progressive: true
 }))
 .pipe(gulp.dest('onlineRetailers/images/imgs')); //输出路径  [压缩后]
 });





//  webserver实现实时刷新

//gulp.task('webserver', function(){
// gulp.src('onlineRetailers')
// .pipe(webserver({
// port: 8080,//端口
// livereload: true,//实时刷新代码。不用f5刷新
// directoryListing: {
// path: 'index.html', //打开服务器显示的文件
// enable: true
// },
// open:true      //自动打开
// }))
// });



//  gulp-connect实现实时刷新

gulp.task('connect', function() {
    connect.server({
    //    root: 'www',      //设置打开服务器显示的站点
    //    port:"9999",      //设置端口号
        livereload: true  //设置实时刷新
    });
});

//输送刷新的文件
gulp.task('html', function () {
    gulp.src('onlineRetailers/index.html')
        .pipe(connect.reload());
});

//看守html文件
gulp.task('watch', function () {
    gulp.watch(['onlineRetailers/index.html'], ['html']);
});

//委托给default  执行多个进程
gulp.task('default', ['connect', 'watch']);
