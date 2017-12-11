## flexible boxes

CSS是一种功能强大的语言，它可以做很多事情，但它却在布局上有所下降。传统的老式布局方法，如float和positioning工作，但有时它们会感觉比他们需要的更复杂、更复杂、更灵活、更有弹性。例如，如果你想要：

垂直中心盒子的内容(不仅仅是文本；line-height 将会失效)。
制作几列有相同的高度包含不同数量内容的列，不使用固定的高度，或用背景图像伪装。
在一行中创建几个盒子，占用相同数量的可用空间，不管有多少个，并且如果它们有内边距，外边距等就应用它


```html
<section>
  <div>This is a box</div>
  <div>This is a box</div>
  <div>This is a box</div>
</section>

<button class="create">Create box</button>
<button class="reset">Reset demo</button>

```

```css

html {
  font-family: sans-serif;
}

section {
  width: 93%;
  height: 240px;
  margin: 20px auto;
  background: purple;
  display: flex;
}

div {
  color: white;
  background: orange;
  flex: 1;
  margin-right: 10px;
  text-shadow: 1px 1px 1px black;
}

div:last-child {
  margin-right: 0;
}

section, div {
  border: 5px solid rgba(0,0,0,0.85);
  padding: 10px;
}

```
