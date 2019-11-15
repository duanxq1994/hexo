---
title: guava Maps
date: 2019-11-14 18:22:14
tags: [guava]
categories: [java]
---
#### 关于Maps的用法，做一下整理
> google的guava包，有很多实用的工具类，可以轻易实现工作中一些常用的功能。

-  静态map常量
~~~java
    ImmutableMap<Integer, String> map = ImmutableMap.<Integer, String>builder()
                    .put(1, "1")
                    .put(2, "2")
                    .build();
~~~
- 双向映射
```java
	ImmutableBiMap<String, String> biMap = ImmutableBiMap.<String, String>builder()
                .put("a", "阿迪")
                .put("b", "百世")
                .put("c", "财通")
                .put("d", "大华")
                .put("e", "e支付")
                .build();
	System.out.println(biMap.get("c"));
	System.out.println(biMap.inverse().get("百世"));
```
- list 转 map
```java
    // list<V> -> map<K,V>
    List<Integer> list1 = Arrays.asList(1, 2, 3, 4, 5);
    // key 唯一
    ImmutableMap<String, Integer> map = Maps.uniqueIndex(list1, String::valueOf);
    System.out.println(map);
    List<Integer> list2 = Arrays.asList(1, 2, 3, 4, 5, 4, 5);
    // key 重复
    ImmutableMultimap<String, Integer> index = Multimaps.index(list2, String::valueOf);
    System.out.println(index);
```
#### maven 依赖
~~~xml
<dependency>
    <groupId>com.google.guava</groupId>
    <artifactId>guava</artifactId>
    <version>28.1-jre</version>
</dependency>
~~~