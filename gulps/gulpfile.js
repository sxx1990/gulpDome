
var gulp=require('gulp'),  //gulp������
    minifycss=require('gulp-minify-css'),   //cssѹ��
    concat=require('gulp-concat'),   //�ϲ��ļ�
    uglify=require('gulp-uglify'),   //jsѹ��
    rename=require('gulp-rename'),   //�ļ�������
    jshint=require('gulp-jshint'),   //js���
    notify=require('gulp-notify'),   //��ʾ
    webserver = require('gulp-webserver'), //webserver
    connect = require("gulp-connect"),      //connect
    htmlmin = require("gulp-htmlmin"),      //htmlѹ��
    imagemin=require('gulp-imagemin');      //imageѹ��



//css�ϲ�ѹ������
gulp.task('minifycss',function(){
     return gulp.src('css/*.css')                 //����css *����ϲ���ѹ��css�ļ���������css�ļ�
         .pipe(concat('style.css'))                  //�ϲ�css�ļ���"style.css"
         //.pipe(gulp.dest('newCss'))            //���·��  [�ϲ��ļ�]
         .pipe(rename({suffix:'.min'}))              //�޸��ļ������.min��׺
         .pipe(minifycss())                          //ѹ���ļ�
         .pipe(gulp.dest('onlineRetailers/css'))                //���·��  [ѹ���ļ�]
         .pipe(notify({message:'css task ok'}));     //��ʾ�ɹ�
});


 //JS�ϲ�ѹ������
gulp.task('minifyjs',function(){
     return gulp.src("js/*.js")           //ѡ��ϲ���JS�ļ�
         .pipe(concat('script.js'))                 //�ϲ�js
         //.pipe(gulp.dest('newJs'))           //���·��  [�ϲ��ļ�]
         .pipe(rename({suffix:'.min'}))            //������
         .pipe(uglify())                           //ѹ��
         .pipe(gulp.dest('onlineRetailers/js'))           //���·��  [ѹ���ļ�]
         .pipe(notify({message:"ok"}));    //��ʾ
 });





// ѹ��html�ļ�

gulp.task('testHtmlmin', function () {
 var options = {
 removeComments: true,                   //���HTMLע��
 collapseWhitespace: true,               //ѹ��HTML
 collapseBooleanAttributes: true,        //ʡ�Բ������Ե�ֵ      <input checked="true"/> ==> <input />
 removeEmptyAttributes: true,            //ɾ�����пո�������ֵ  <input id="" /> ==> <input />
 removeScriptTypeAttributes: true,       //ɾ��<script>��type="text/javascript"
 removeStyleLinkTypeAttributes: true,    //ɾ��<style>��<link>��type="text/css"
 minifyJS: true,                         //ѹ��ҳ��JS
 minifyCSS: true                         //ѹ��ҳ��CSS
 };
 gulp.src('index.html')
 .pipe(htmlmin(options))                 //ѹ��html
 .pipe(gulp.dest('onlineRetailers'));      //���Ŀ¼  [ѹ���ļ�]
 });




//ѹ��ͼƬ�ļ�

gulp.task('imagemin', function () {
 gulp.src('images/imgs/*.*')  //��ѹ���ļ���·������js/css/html ͬ��ɴ�����ָ���ļ�
 .pipe(imagemin({
 progressive: true
 }))
 .pipe(gulp.dest('onlineRetailers/images/imgs')); //���·��  [ѹ����]
 });





//  webserverʵ��ʵʱˢ��

//gulp.task('webserver', function(){
// gulp.src('onlineRetailers')
// .pipe(webserver({
// port: 8080,//�˿�
// livereload: true,//ʵʱˢ�´��롣����f5ˢ��
// directoryListing: {
// path: 'index.html', //�򿪷�������ʾ���ļ�
// enable: true
// },
// open:true      //�Զ���
// }))
// });



//  gulp-connectʵ��ʵʱˢ��

gulp.task('connect', function() {
    connect.server({
    //    root: 'www',      //���ô򿪷�������ʾ��վ��
    //    port:"9999",      //���ö˿ں�
        livereload: true  //����ʵʱˢ��
    });
});

//����ˢ�µ��ļ�
gulp.task('html', function () {
    gulp.src('onlineRetailers/index.html')
        .pipe(connect.reload());
});

//����html�ļ�
gulp.task('watch', function () {
    gulp.watch(['onlineRetailers/index.html'], ['html']);
});

//ί�и�default  ִ�ж������
gulp.task('default', ['connect', 'watch']);
