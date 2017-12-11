## 指定元素的布局为 flexible

首先，我们需要选择将哪些元素将设置为 flexible 框。我们需要给这些 flexible 元素的父元素 display 设置一个特定值。在本例中，我们想要设置 <article> 元素，因此我们给 <section>（变成了 flex 容器）设置 display：

```css

section {
  display: flex;
}

```

> 注意：假如你想设置行内元素为 flexible box，也可以置 display 属性的值为 inline-flex。

## flex 模型说明

当元素表现为 flex 框时，它们沿着两个轴来布局：

![](https://mdn.mozillademos.org/files/3739/flex_terms.png)

- 主轴（main axis）是沿着 flex 元素放置的方向延伸的轴（比如页面上的横向的行、纵向的列）。该轴的开始和结束被称为 main start 和 main end。
- 交叉轴（cross axis）是垂直于 flex 元素放置方向的轴。该轴的开始和结束被称为 cross start 和 cross end。
- 设置了 display: flex 的父元素（在本例中是 <section>）被称之为 flex 容器（flex container）。


## flex 项的动态尺寸

第一步，将以下规则添加到 CSS 的底部：
```css

article {
  flex: 1;
}

```

这是一个无单位的比例值，表示每个 flex 项沿主轴的可用空间大小。本例中，我们设置 <article> 元素的 flex 值为 1，这表示每个元素占用空间都是相等的，占用的空间是在设置 padding 和 margin 之后剩余的空间。因为它是一个比例，这意味着将每个 flex 项的设置为 400000 的效果和 1 的时候是完全一样的。

现在在上一个规则下添加：

```css

article:nth-of-type(3) {
  flex: 2;
}

```

现在当你刷新，你会看到第三个 <article> 元素占用了两倍的可用宽度和剩下的一样 — 现在总共有四个比例单位可用。 前两个 flex 项各有一个，因此它们占用每个可用空间的1/4。 第三个有两个单位，所以它占用2/4或这说是1/2的可用空间。


您还可以指定 flex 的最小值。 尝试修改现有的 article 规则：

```css

article {
  flex: 1 200px;
}

article:nth-of-type(3) {
  flex: 2 200px;
}

```
这表示“每个flex 项将首先给出200px的可用空间，然后，剩余的可用空间将根据分配的比例共享“。 尝试刷新，你会看到分配空间的差别。
