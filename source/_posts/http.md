---
title: 使用 httpclient 发送post请求
date: 2017-08-17 23:24:51
tags: [http]
categories: [http]
---

### maven 依赖
~~~xml
<dependency>
    <groupId>org.apache.httpcomponents</groupId>
    <artifactId>httpmime</artifactId>
    <version>4.3.6</version>
</dependency>
~~~

### 代码 
~~~java
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.ByteArrayBody;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.InputStreamBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.util.FileCopyUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;


public class Test {

    public static void main(String[] args) throws IOException {

        String url = "http://localhost:8001/test.json";
        String fieldName = "file";//接收字段名称
        File file = new File("C:\\Users\\Admin\\Desktop\\example.png");
        String fileName = file.getName();//文件名称
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(url);
        MultipartEntityBuilder builder = MultipartEntityBuilder.create();
        //设置兼容模式，防止中文文件名乱码
        builder.setCharset(StandardCharsets.UTF_8);
        builder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
        builder.addTextBody("key", "编码", ContentType.DEFAULT_TEXT.withCharset(StandardCharsets.UTF_8));// 没有后面这个编码，中文会乱码
        //下面是三种发送文件的方式 file、inputStream、byte[]
        //三种方式可以同时存在
        builder.addPart(fieldName, new FileBody(file));//1
        builder.addPart(fieldName, new ByteArrayBody(FileCopyUtils.copyToByteArray(file), fileName));//2
        builder.addPart(fieldName, new InputStreamBody(new FileInputStream(file), fileName));//3
        // 2、3两种方式fileName是关键
        // 4、5这种是没有传fileName的
        // 没有fileName字段的话 spring mvc multipartFile接收不到文件
        // 可以request.getPart(fieldName).getInputStream()
        builder.addBinaryBody(fieldName, FileCopyUtils.copyToByteArray(file));//4
        builder.addBinaryBody(fieldName, new FileInputStream(file));//5

        httpPost.setEntity(builder.build());
        CloseableHttpResponse execute = client.execute(httpPost);
        if (execute.getStatusLine().getStatusCode() == 200) {
            HttpEntity entity = execute.getEntity();
            System.out.println(EntityUtils.toString(entity));
        }
    }

}
~~~


