---
slug: /graphviz-api/
title: Using the QuickChart GraphViz API
sidebar_label: GraphViz
tags: ['graphviz']
---

<head><title>GraphViz API</title></head>

import Author from '@site/documentation/components/Author';
import Image from '../components/Image';
import CodeWithHighlights from '../components/CodeWithHighlights';

QuickChart is an open-source API that generates GraphViz charts. The API takes a graph description in the [DOT](<https://en.wikipedia.org/wiki/DOT_(graph_description_language)>) language and renders it with the latest stable version of GraphViz, returning the output as PNG or SVG.

To get started, use the `https://quickchart.io/graphviz` endpoint. Here's a simple example:

<CodeWithHighlights centered code="**https://quickchart.io/graphviz?graph=**graph{a--b}" />

<Image noBorder src="https://quickchart.io/graphviz?graph=graph{a--b}"/>

You'll notice that it defaults to SVG output. Let's change it to PNG and give it some dimensions so I can, for example, send it in an email:

<CodeWithHighlights centered code="https://quickchart.io/graphviz?**format=png&amp;width=100&amp;height=150**&amp;graph=graph{a--b}"/>

<Image noBorder src="https://quickchart.io/graphviz?format=png&width=80&height=150&graph=graph{a--b}"/>

## Examples

### Directed graphs

Directed graphs or "digraphs" have edges that define a direction from one vertex to another. Here's our DOT definition for a straightforward directed graph:

```
digraph {
  main->parse->execute;
  main->init;
  main->cleanup;
  execute->make_string;
  execute->printf
  init->make_string;
  main->printf;
  execute->compare;
}
```

Pack it into the URL:

<CodeWithHighlights code="https://quickchart.io/graphviz?graph=**digraph{main->parse->execute;main->init;main->cleanup;execute->make_string;execute->printf;init->make_string;main->printf;execute->compare;}**" />

And it will render like so:

<Image noBorder src="https://quickchart.io/graphviz?graph=digraph{main->parse->execute;main->init;main->cleanup;execute->make_string;execute->printf;init->make_string;main->printf;execute->compare;}"/>

### Node shapes and colors

GraphViz is incredibly flexible. There are 59 built-in node shapes available, and you can also edit colors and styles however you like:

```
digraph G {
    size ="4,4";
    main [shape=doubleoctagon];
    main -> parse [weight=8];
    parse -> execute;
    main -> init [style=dotted];
    main -> cleanup;
    execute -> { make_string; printf}
    init -> make_string;
    edge [color=red];   // so is this
    main -> printf [style=bold,label="100 times"];
    make_string [label="make a\nstring"];
    node [shape=star,style=filled,color=".7 .3 1.0"];
    execute -> compare;
}
```

Let's put the above graph description in our API url:

```
https://quickchart.io/graphviz?graph=digraph{...}
```

This URL returns the following image:

<Image noBorder src="https://quickchart.io/graphviz?graph=digraph%20G%20%7B%0A%20%20%20%20size%20%3D%224%2C4%22%3B%0A%20%20%20%20main%20%5Bshape%3Ddoubleoctagon%5D%3B%20%20%20%2F%2A%20this%20is%20a%20comment%20%2A%2F%0A%20%20%20%20main%20-%3E%20parse%20%5Bweight%3D8%5D%3B%0A%20%20%20%20parse%20-%3E%20execute%3B%0A%20%20%20%20main%20-%3E%20init%20%5Bstyle%3Ddotted%5D%3B%0A%20%20%20%20main%20-%3E%20cleanup%3B%0A%20%20%20%20execute%20-%3E%20%7B%20make_string%3B%20printf%7D%0A%20%20%20%20init%20-%3E%20make_string%3B%0A%20%20%20%20edge%20%5Bcolor%3Dred%5D%3B%20%20%20%2F%2F%20so%20is%20this%0A%20%20%20%20main%20-%3E%20printf%20%5Bstyle%3Dbold%2Clabel%3D%22100%20times%22%5D%3B%0A%20%20%20%20make_string%20%5Blabel%3D%22make%20a%5Cnstring%22%5D%3B%0A%20%20%20%20node%20%5Bshape%3Dstar%2Cstyle%3Dfilled%2Ccolor%3D%22.7%20.3%201.0%22%5D%3B%0A%20%20%20%20execute%20-%3E%20compare%3B%0A%7D" />

Note that when sending a GET request, you should always **URL encode** your `graph` parameter in the API request. For more complex charts, this is a requirement.

Learn more about node shapes and styling from the official GraphViz documentation [here](https://graphviz.org/doc/info/shapes.html).

### Subgraphs

Subgraphs are an important tool in GraphViz that are best used to illustrate clusters of nodes. Here's an [example graph](https://graphs.grevian.org) created by Josh Hayes-Sheen:

```
digraph {
  subgraph cluster_0 {
    label="Subgraph A";
    a -> b;
    b -> c;
    c -> d;
  }

  subgraph cluster_1 {
    label="Subgraph B";
    a -> f;
    f -> c;
  }
}
```

<Image noBorder src="https://quickchart.io/graphviz?graph=digraph%20%7B%0A%20%20subgraph%20cluster_0%20%7B%0A%20%20%20%20label%3D%22Subgraph%20A%22%3B%0A%20%20%20%20a%20-%3E%20b%3B%0A%20%20%20%20b%20-%3E%20c%3B%0A%20%20%20%20c%20-%3E%20d%3B%0A%20%20%7D%0A%0A%20%20subgraph%20cluster_1%20%7B%0A%20%20%20%20label%3D%22Subgraph%20B%22%3B%0A%20%20%20%20a%20-%3E%20f%3B%0A%20%20%20%20f%20-%3E%20c%3B%0A%20%20%7D%0A%7D" />

You can use a more elaborate subgraph to illustrate complex processes (from [graphviz documentation](https://graphviz.gitlab.io/_pages/Gallery/directed/cluster.html)):

```
digraph G {
  subgraph cluster_0 {
    style=filled;
    color=lightgrey;
    node [style=filled,color=white];
    a0 -> a1 -> a2 -> a3;
    label = "process #1";
  }

  subgraph cluster_1 {
    node [style=filled];
    b0 -> b1 -> b2 -> b3;
    label = "process #2";
    color=blue
  }
  start -> a0;
  start -> b0;
  a1 -> b3;
  b2 -> a3;
  a3 -> a0;
  a3 -> end;
  b3 -> end;

  start [shape=Mdiamond];
  end [shape=Msquare];
}
```

<Image noBorder src="https://quickchart.io/graphviz?graph=digraph%20G%20%7B%0A%0A%09subgraph%20cluster_0%20%7B%0A%09%09style%3Dfilled%3B%0A%09%09color%3Dlightgrey%3B%0A%09%09node%20%5Bstyle%3Dfilled%2Ccolor%3Dwhite%5D%3B%0A%09%09a0%20-%3E%20a1%20-%3E%20a2%20-%3E%20a3%3B%0A%09%09label%20%3D%20%22process%20%231%22%3B%0A%09%7D%0A%0A%09subgraph%20cluster_1%20%7B%0A%09%09node%20%5Bstyle%3Dfilled%5D%3B%0A%09%09b0%20-%3E%20b1%20-%3E%20b2%20-%3E%20b3%3B%0A%09%09label%20%3D%20%22process%20%232%22%3B%0A%09%09color%3Dblue%0A%09%7D%0A%09start%20-%3E%20a0%3B%0A%09start%20-%3E%20b0%3B%0A%09a1%20-%3E%20b3%3B%0A%09b2%20-%3E%20a3%3B%0A%09a3%20-%3E%20a0%3B%0A%09a3%20-%3E%20end%3B%0A%09b3%20-%3E%20end%3B%0A%0A%09start%20%5Bshape%3DMdiamond%5D%3B%0A%09end%20%5Bshape%3DMsquare%5D%3B%0A%7D" />

### Record-based nodes

In contrast the polygon or shape based nodes we see above, you can create tabular "record" nodes that are split into several blocks.

Here's a simple example:

```
digraph structs {
  node[shape=record]
  struct1 [label="<f0> left|<f1> middle|<f2> right"];
  struct2 [label="{<f0> one|<f1> two}" shape=Mrecord];
  struct3 [label="hello\nworld |{ b |{c|<here> d|e}| f}| g | h"];
  struct1:f1 -> struct2:f0;
  struct1:f0 -> struct3:f1;
}
```

<Image noBorder src="https://quickchart.io/graphviz?graph=digraph%20structs%20%7B%0A%20%20node%5Bshape%3Drecord%5D%0A%20%20struct1%20%5Blabel%3D%22%3Cf0%3E%20left%7C%3Cf1%3E%20middle%7C%3Cf2%3E%20right%22%5D%3B%0A%20%20struct2%20%5Blabel%3D%22%7B%3Cf0%3E%20one%7C%3Cf1%3E%20two%7D%22%20shape%3DMrecord%5D%3B%0A%20%20struct3%20%5Blabel%3D%22hello%5Cnworld%20%7C%7B%20b%20%7C%7Bc%7C%3Chere%3E%20d%7Ce%7D%7C%20f%7D%7C%20g%20%7C%20h%22%5D%3B%0A%20%20struct1%3Af1%20-%3E%20struct2%3Af0%3B%0A%20%20struct1%3Af0%20-%3E%20struct3%3Af1%3B%0A%7D" />

### HTML-like nodes

Record nodes have fallen out of favor compared to [HTML-like node labels](http://www.graphviz.org/doc/info/shapes.html#html), which allow you to put limited HTML markup in your graph description. Although it's much more verbose, it's more flexible than the record-based approach and yields more possibilities:

```
digraph G {
  node [shape=plaintext]
  a [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
            <TR><TD PORT="c" BGCOLOR="gray">first</TD></TR>
            <TR><TD>second</TD></TR>
            <TR><TD>third</TD></TR>
       </TABLE>>];
  b [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
            <TR><TD PORT="c" BGCOLOR="pink">first</TD></TR>
            <TR><TD>second</TD></TR>
            <TR><TD>third</TD></TR>
       </TABLE>>];
  a:c -> b:c;
}
```

Pack this graph description into the `/graphviz?format=png` endpoint and we get the following:

<Image noBorder src="https://quickchart.io/graphviz?format=png&graph=digraph%20G%20%7B%0A%20%20node%20%5Bshape%3Dplaintext%5D%0A%20%20a%20%5Blabel%3D%3C%3CTABLE%20BORDER%3D%220%22%20CELLBORDER%3D%221%22%20CELLSPACING%3D%220%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CTR%3E%3CTD%20PORT%3D%22c%22%20BGCOLOR%3D%22gray%22%3Efirst%3C%2FTD%3E%3C%2FTR%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CTR%3E%3CTD%3Esecond%3C%2FTD%3E%3C%2FTR%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CTR%3E%3CTD%3Ethird%3C%2FTD%3E%3C%2FTR%3E%0A%20%20%20%20%20%20%20%3C%2FTABLE%3E%3E%5D%3B%0A%20%20b%20%5Blabel%3D%3C%3CTABLE%20BORDER%3D%220%22%20CELLBORDER%3D%221%22%20CELLSPACING%3D%220%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CTR%3E%3CTD%20PORT%3D%22c%22%20BGCOLOR%3D%22pink%22%3Efirst%3C%2FTD%3E%3C%2FTR%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CTR%3E%3CTD%3Esecond%3C%2FTD%3E%3C%2FTR%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CTR%3E%3CTD%3Ethird%3C%2FTD%3E%3C%2FTR%3E%0A%20%20%20%20%20%20%20%3C%2FTABLE%3E%3E%5D%3B%0A%20%20a%3Ac%20-%3E%20b%3Ac%3B%0A%7D" />

## Layout engines

GraphViz is comprised by DOT, the language that describes the graph itself, and a set of programs that generate the graph layout. The default layout is also called `dot`, but there are many other layout programs available.

You can select a layout engine in the QuickChart API by adding a parameter `layout=dot`. Available layout engines include dot, fdp, neato, circo, twopi, and osage.

This section will use a simple [example](https://github.com/rsms/graphviz) created by Rasmus Andersson to illustrate the difference between layout systems.

### dot

The DOT layout engine is generally used to show hierarchical structure in directed graphs.

<Image noBorder src="https://quickchart.io/graphviz?graph=digraph%20%7B%0A%20%20node%20%5B%0A%20%20%20%20shape%20%3D%20circle%0A%20%20%20%20style%3D%22filled%2Cbold%22%0A%20%20%20%20color%3Dblack%0A%20%20%20%20fillcolor%3D%22%23F2F2F2%22%0A%20%20%20%20fontname%3DInter%0A%20%20%5D%0A%0A%20%20A%20-%3E%20C%0A%20%20B%20-%3E%20%7B%20C%2C%20D%2C%20F%20%7D%0A%20%20C%20-%3E%20H%0A%20%20D%20-%3E%20%7B%20F%2C%20G%20%7D%0A%20%20E%20-%3E%20%7B%20F%2C%20G%2C%20J%20%7D%0A%20%20F%20-%3E%20I%0A%20%20G%20-%3E%20L%0A%20%20H%20-%3E%20K%0A%20%20I%20-%3E%20K%0A%20%20J%20-%3E%20M%0A%20%20K%20-%3E%20N%0A%20%20L%20-%3E%20N%0A%20%20M%20-%3E%20N%0A%20%20N%20-%3E%20O%0A%0A%20%20A%20%5B%20fillcolor%20%3D%20%22%23ECD1C9%22%20%5D%0A%20%20B%20%5B%20fillcolor%20%3D%20%22%23FBB5AE%22%20%5D%0A%20%20C%20%5B%20fillcolor%20%3D%20%22%23FFEFBC%22%20%5D%0A%20%20D%20%5B%20fillcolor%20%3D%20%22%23B7D1DF%22%20%5D%0A%20%20E%20%5B%20fillcolor%20%3D%20%22%23D1E2CE%22%20%5D%0A%20%20F%20%5B%20fillcolor%20%3D%20%22%23FADAE5%22%20%5D%0A%20%20G%20%5B%20fillcolor%20%3D%20%22%23ECE3D5%22%20%5D%0A%20%20H%20%5B%20fillcolor%20%3D%20%22%23F2F2F2%22%20%5D%0A%20%20I%20%5B%20fillcolor%20%3D%20%22%23ECE3C1%22%20%5D%0A%20%20J%20%5B%20fillcolor%20%3D%20%22%23BEDFC8%22%20%5D%0A%20%20K%20%5B%20fillcolor%20%3D%20%22%23F9F2B6%22%20%5D%0A%20%20L%20%5B%20fillcolor%20%3D%20%22%23EFD0BD%22%20%5D%0A%20%20M%20%5B%20fillcolor%20%3D%20%22%23DDD0E5%22%20%5D%0A%20%20N%20%5B%20fillcolor%20%3D%20%22%23F2E4C8%22%20%5D%0A%20%20O%20%5B%20fillcolor%20%3D%20%22%23CBCBCB%22%20%5D%0A%7D" />

### fdp

This is generally used for undirected graphs. It uses a spring model with a force-directed approach to determine the position of each node.

Here's the same graph as above except undirected, using the fdp layout engine, `/graphviz?layout=fdp&graph=...`:

<Image noBorder src="https://quickchart.io/graphviz?engine=fdp&graph=graph%7B%0A%20%20node%20%5B%0A%20%20%20%20shape%20%3D%20circle%0A%20%20%20%20style%3D%22filled%2Cbold%22%0A%20%20%20%20color%3Dblack%0A%20%20%20%20fillcolor%3D%22%23F2F2F2%22%0A%20%20%20%20fontname%3DInter%0A%20%20%5D%0A%0A%20%20A%20--%20C%0A%20%20B%20--%20%7B%20C%2C%20D%2C%20F%20%7D%0A%20%20C%20--%20H%0A%20%20D%20--%20%7B%20F%2C%20G%20%7D%0A%20%20E%20--%20%7B%20F%2C%20G%2C%20J%20%7D%0A%20%20F%20--%20I%0A%20%20G%20--%20L%0A%20%20H%20--%20K%0A%20%20I%20--%20K%0A%20%20J%20--%20M%0A%20%20K%20--%20N%0A%20%20L%20--%20N%0A%20%20M%20--%20N%0A%20%20N%20--%20O%0A%0A%20%20A%20%5B%20fillcolor%20%3D%20%22%23ECD1C9%22%20%5D%0A%20%20B%20%5B%20fillcolor%20%3D%20%22%23FBB5AE%22%20%5D%0A%20%20C%20%5B%20fillcolor%20%3D%20%22%23FFEFBC%22%20%5D%0A%20%20D%20%5B%20fillcolor%20%3D%20%22%23B7D1DF%22%20%5D%0A%20%20E%20%5B%20fillcolor%20%3D%20%22%23D1E2CE%22%20%5D%0A%20%20F%20%5B%20fillcolor%20%3D%20%22%23FADAE5%22%20%5D%0A%20%20G%20%5B%20fillcolor%20%3D%20%22%23ECE3D5%22%20%5D%0A%20%20H%20%5B%20fillcolor%20%3D%20%22%23F2F2F2%22%20%5D%0A%20%20I%20%5B%20fillcolor%20%3D%20%22%23ECE3C1%22%20%5D%0A%20%20J%20%5B%20fillcolor%20%3D%20%22%23BEDFC8%22%20%5D%0A%20%20K%20%5B%20fillcolor%20%3D%20%22%23F9F2B6%22%20%5D%0A%20%20L%20%5B%20fillcolor%20%3D%20%22%23EFD0BD%22%20%5D%0A%20%20M%20%5B%20fillcolor%20%3D%20%22%23DDD0E5%22%20%5D%0A%20%20N%20%5B%20fillcolor%20%3D%20%22%23F2E4C8%22%20%5D%0A%20%20O%20%5B%20fillcolor%20%3D%20%22%23CBCBCB%22%20%5D%0A%7D" />

### neato

Neato is another layout engine generally used for undirected graphs. It uses a spring model as well. The neato engine tends to do better than fdp engine when rendering clusters and cyclic subgraphs, spacing things out more evenly and making cycles stand out more.

<Image noBorder src="https://quickchart.io/graphviz?engine=neato&graph=graph%7B%0A%20%20node%20%5B%0A%20%20%20%20shape%20%3D%20circle%0A%20%20%20%20style%3D%22filled%2Cbold%22%0A%20%20%20%20color%3Dblack%0A%20%20%20%20fillcolor%3D%22%23F2F2F2%22%0A%20%20%20%20fontname%3DInter%0A%20%20%5D%0A%0A%20%20A%20--%20C%0A%20%20B%20--%20%7B%20C%2C%20D%2C%20F%20%7D%0A%20%20C%20--%20H%0A%20%20D%20--%20%7B%20F%2C%20G%20%7D%0A%20%20E%20--%20%7B%20F%2C%20G%2C%20J%20%7D%0A%20%20F%20--%20I%0A%20%20G%20--%20L%0A%20%20H%20--%20K%0A%20%20I%20--%20K%0A%20%20J%20--%20M%0A%20%20K%20--%20N%0A%20%20L%20--%20N%0A%20%20M%20--%20N%0A%20%20N%20--%20O%0A%0A%20%20A%20%5B%20fillcolor%20%3D%20%22%23ECD1C9%22%20%5D%0A%20%20B%20%5B%20fillcolor%20%3D%20%22%23FBB5AE%22%20%5D%0A%20%20C%20%5B%20fillcolor%20%3D%20%22%23FFEFBC%22%20%5D%0A%20%20D%20%5B%20fillcolor%20%3D%20%22%23B7D1DF%22%20%5D%0A%20%20E%20%5B%20fillcolor%20%3D%20%22%23D1E2CE%22%20%5D%0A%20%20F%20%5B%20fillcolor%20%3D%20%22%23FADAE5%22%20%5D%0A%20%20G%20%5B%20fillcolor%20%3D%20%22%23ECE3D5%22%20%5D%0A%20%20H%20%5B%20fillcolor%20%3D%20%22%23F2F2F2%22%20%5D%0A%20%20I%20%5B%20fillcolor%20%3D%20%22%23ECE3C1%22%20%5D%0A%20%20J%20%5B%20fillcolor%20%3D%20%22%23BEDFC8%22%20%5D%0A%20%20K%20%5B%20fillcolor%20%3D%20%22%23F9F2B6%22%20%5D%0A%20%20L%20%5B%20fillcolor%20%3D%20%22%23EFD0BD%22%20%5D%0A%20%20M%20%5B%20fillcolor%20%3D%20%22%23DDD0E5%22%20%5D%0A%20%20N%20%5B%20fillcolor%20%3D%20%22%23F2E4C8%22%20%5D%0A%20%20O%20%5B%20fillcolor%20%3D%20%22%23CBCBCB%22%20%5D%0A%7D" />

### circo

The circo layout engine is for circular layout of graphs, as the name suggests. This is used to generate graphs that show cyclic structure and biconnected components. The algorithm attempts to minimize edge crossings within the circle by placing edges on the perimeter of the circle if possible.

<Image noBorder src="https://quickchart.io/graphviz?engine=circo&graph=graph%7B%0A%20%20node%20%5B%0A%20%20%20%20shape%20%3D%20circle%0A%20%20%20%20style%3D%22filled%2Cbold%22%0A%20%20%20%20color%3Dblack%0A%20%20%20%20fillcolor%3D%22%23F2F2F2%22%0A%20%20%20%20fontname%3DInter%0A%20%20%5D%0A%0A%20%20A%20--%20C%0A%20%20B%20--%20%7B%20C%2C%20D%2C%20F%20%7D%0A%20%20C%20--%20H%0A%20%20D%20--%20%7B%20F%2C%20G%20%7D%0A%20%20E%20--%20%7B%20F%2C%20G%2C%20J%20%7D%0A%20%20F%20--%20I%0A%20%20G%20--%20L%0A%20%20H%20--%20K%0A%20%20I%20--%20K%0A%20%20J%20--%20M%0A%20%20K%20--%20N%0A%20%20L%20--%20N%0A%20%20M%20--%20N%0A%20%20N%20--%20O%0A%0A%20%20A%20%5B%20fillcolor%20%3D%20%22%23ECD1C9%22%20%5D%0A%20%20B%20%5B%20fillcolor%20%3D%20%22%23FBB5AE%22%20%5D%0A%20%20C%20%5B%20fillcolor%20%3D%20%22%23FFEFBC%22%20%5D%0A%20%20D%20%5B%20fillcolor%20%3D%20%22%23B7D1DF%22%20%5D%0A%20%20E%20%5B%20fillcolor%20%3D%20%22%23D1E2CE%22%20%5D%0A%20%20F%20%5B%20fillcolor%20%3D%20%22%23FADAE5%22%20%5D%0A%20%20G%20%5B%20fillcolor%20%3D%20%22%23ECE3D5%22%20%5D%0A%20%20H%20%5B%20fillcolor%20%3D%20%22%23F2F2F2%22%20%5D%0A%20%20I%20%5B%20fillcolor%20%3D%20%22%23ECE3C1%22%20%5D%0A%20%20J%20%5B%20fillcolor%20%3D%20%22%23BEDFC8%22%20%5D%0A%20%20K%20%5B%20fillcolor%20%3D%20%22%23F9F2B6%22%20%5D%0A%20%20L%20%5B%20fillcolor%20%3D%20%22%23EFD0BD%22%20%5D%0A%20%20M%20%5B%20fillcolor%20%3D%20%22%23DDD0E5%22%20%5D%0A%20%20N%20%5B%20fillcolor%20%3D%20%22%23F2E4C8%22%20%5D%0A%20%20O%20%5B%20fillcolor%20%3D%20%22%23CBCBCB%22%20%5D%0A%7D" />

### twopi

The twopi layout engine generates radial layouts, drawing nodes in concentric circles depending on their distance from a root node.

One node is chosen as the center (in this case, E) and is placed at the origin. All nodes of the same distance from the center are placed on the same concentric circle around the center.

This graph, for example, makes it easy to see that nodes A, H, and O are the farthest from E.

<Image noBorder src="https://quickchart.io/graphviz?engine=twopi&graph=graph%7B%0A%20%20node%20%5B%0A%20%20%20%20shape%20%3D%20circle%0A%20%20%20%20style%3D%22filled%2Cbold%22%0A%20%20%20%20color%3Dblack%0A%20%20%20%20fillcolor%3D%22%23F2F2F2%22%0A%20%20%20%20fontname%3DInter%0A%20%20%5D%0A%0A%20%20A%20--%20C%0A%20%20B%20--%20%7B%20C%2C%20D%2C%20F%20%7D%0A%20%20C%20--%20H%0A%20%20D%20--%20%7B%20F%2C%20G%20%7D%0A%20%20E%20--%20%7B%20F%2C%20G%2C%20J%20%7D%0A%20%20F%20--%20I%0A%20%20G%20--%20L%0A%20%20H%20--%20K%0A%20%20I%20--%20K%0A%20%20J%20--%20M%0A%20%20K%20--%20N%0A%20%20L%20--%20N%0A%20%20M%20--%20N%0A%20%20N%20--%20O%0A%0A%20%20A%20%5B%20fillcolor%20%3D%20%22%23ECD1C9%22%20%5D%0A%20%20B%20%5B%20fillcolor%20%3D%20%22%23FBB5AE%22%20%5D%0A%20%20C%20%5B%20fillcolor%20%3D%20%22%23FFEFBC%22%20%5D%0A%20%20D%20%5B%20fillcolor%20%3D%20%22%23B7D1DF%22%20%5D%0A%20%20E%20%5B%20fillcolor%20%3D%20%22%23D1E2CE%22%20%5D%0A%20%20F%20%5B%20fillcolor%20%3D%20%22%23FADAE5%22%20%5D%0A%20%20G%20%5B%20fillcolor%20%3D%20%22%23ECE3D5%22%20%5D%0A%20%20H%20%5B%20fillcolor%20%3D%20%22%23F2F2F2%22%20%5D%0A%20%20I%20%5B%20fillcolor%20%3D%20%22%23ECE3C1%22%20%5D%0A%20%20J%20%5B%20fillcolor%20%3D%20%22%23BEDFC8%22%20%5D%0A%20%20K%20%5B%20fillcolor%20%3D%20%22%23F9F2B6%22%20%5D%0A%20%20L%20%5B%20fillcolor%20%3D%20%22%23EFD0BD%22%20%5D%0A%20%20M%20%5B%20fillcolor%20%3D%20%22%23DDD0E5%22%20%5D%0A%20%20N%20%5B%20fillcolor%20%3D%20%22%23F2E4C8%22%20%5D%0A%20%20O%20%5B%20fillcolor%20%3D%20%22%23CBCBCB%22%20%5D%0A%7D" />

### osage

The osage layout engine is for large undirected graphed with multiple subgraphs. It separates the graph into "levels" (clusters) and lays out each level in a rectangle. The rectangles are then packed together. Within each rectangle, the subgraph/cluster is laid out.

This makes the separation and composition of graph clusters very distinct in the visualization.

Our example doesn't have subgraphs, so the effect of the osage layout engine is just that our nodes are arranged in a table, and the edges turn into a mess.

<Image noBorder src="https://quickchart.io/graphviz?engine=osage&graph=graph%7B%0A%20%20node%20%5B%0A%20%20%20%20shape%20%3D%20circle%0A%20%20%20%20style%3D%22filled%2Cbold%22%0A%20%20%20%20color%3Dblack%0A%20%20%20%20fillcolor%3D%22%23F2F2F2%22%0A%20%20%20%20fontname%3DInter%0A%20%20%5D%0A%0A%20%20A%20--%20C%0A%20%20B%20--%20%7B%20C%2C%20D%2C%20F%20%7D%0A%20%20C%20--%20H%0A%20%20D%20--%20%7B%20F%2C%20G%20%7D%0A%20%20E%20--%20%7B%20F%2C%20G%2C%20J%20%7D%0A%20%20F%20--%20I%0A%20%20G%20--%20L%0A%20%20H%20--%20K%0A%20%20I%20--%20K%0A%20%20J%20--%20M%0A%20%20K%20--%20N%0A%20%20L%20--%20N%0A%20%20M%20--%20N%0A%20%20N%20--%20O%0A%0A%20%20A%20%5B%20fillcolor%20%3D%20%22%23ECD1C9%22%20%5D%0A%20%20B%20%5B%20fillcolor%20%3D%20%22%23FBB5AE%22%20%5D%0A%20%20C%20%5B%20fillcolor%20%3D%20%22%23FFEFBC%22%20%5D%0A%20%20D%20%5B%20fillcolor%20%3D%20%22%23B7D1DF%22%20%5D%0A%20%20E%20%5B%20fillcolor%20%3D%20%22%23D1E2CE%22%20%5D%0A%20%20F%20%5B%20fillcolor%20%3D%20%22%23FADAE5%22%20%5D%0A%20%20G%20%5B%20fillcolor%20%3D%20%22%23ECE3D5%22%20%5D%0A%20%20H%20%5B%20fillcolor%20%3D%20%22%23F2F2F2%22%20%5D%0A%20%20I%20%5B%20fillcolor%20%3D%20%22%23ECE3C1%22%20%5D%0A%20%20J%20%5B%20fillcolor%20%3D%20%22%23BEDFC8%22%20%5D%0A%20%20K%20%5B%20fillcolor%20%3D%20%22%23F9F2B6%22%20%5D%0A%20%20L%20%5B%20fillcolor%20%3D%20%22%23EFD0BD%22%20%5D%0A%20%20M%20%5B%20fillcolor%20%3D%20%22%23DDD0E5%22%20%5D%0A%20%20N%20%5B%20fillcolor%20%3D%20%22%23F2E4C8%22%20%5D%0A%20%20O%20%5B%20fillcolor%20%3D%20%22%23CBCBCB%22%20%5D%0A%7D" />

### patchwork

The patchwork layout engine for GraphViz draws the graph as a squarified treemap. The clusters on the graph are used to create the tree.

Here's our graph with the `layout=patchwork` parameter:

<Image noBorder src="https://quickchart.io/graphviz?engine=patchwork&graph=graph%7B%0A%20%20node%20%5B%0A%20%20%20%20shape%20%3D%20circle%0A%20%20%20%20style%3D%22filled%2Cbold%22%0A%20%20%20%20color%3Dblack%0A%20%20%20%20fillcolor%3D%22%23F2F2F2%22%0A%20%20%20%20fontname%3DInter%0A%20%20%5D%0A%0A%20%20A%20--%20C%0A%20%20B%20--%20%7B%20C%2C%20D%2C%20F%20%7D%0A%20%20C%20--%20H%0A%20%20D%20--%20%7B%20F%2C%20G%20%7D%0A%20%20E%20--%20%7B%20F%2C%20G%2C%20J%20%7D%0A%20%20F%20--%20I%0A%20%20G%20--%20L%0A%20%20H%20--%20K%0A%20%20I%20--%20K%0A%20%20J%20--%20M%0A%20%20K%20--%20N%0A%20%20L%20--%20N%0A%20%20M%20--%20N%0A%20%20N%20--%20O%0A%0A%20%20A%20%5B%20fillcolor%20%3D%20%22%23ECD1C9%22%20%5D%0A%20%20B%20%5B%20fillcolor%20%3D%20%22%23FBB5AE%22%20%5D%0A%20%20C%20%5B%20fillcolor%20%3D%20%22%23FFEFBC%22%20%5D%0A%20%20D%20%5B%20fillcolor%20%3D%20%22%23B7D1DF%22%20%5D%0A%20%20E%20%5B%20fillcolor%20%3D%20%22%23D1E2CE%22%20%5D%0A%20%20F%20%5B%20fillcolor%20%3D%20%22%23FADAE5%22%20%5D%0A%20%20G%20%5B%20fillcolor%20%3D%20%22%23ECE3D5%22%20%5D%0A%20%20H%20%5B%20fillcolor%20%3D%20%22%23F2F2F2%22%20%5D%0A%20%20I%20%5B%20fillcolor%20%3D%20%22%23ECE3C1%22%20%5D%0A%20%20J%20%5B%20fillcolor%20%3D%20%22%23BEDFC8%22%20%5D%0A%20%20K%20%5B%20fillcolor%20%3D%20%22%23F9F2B6%22%20%5D%0A%20%20L%20%5B%20fillcolor%20%3D%20%22%23EFD0BD%22%20%5D%0A%20%20M%20%5B%20fillcolor%20%3D%20%22%23DDD0E5%22%20%5D%0A%20%20N%20%5B%20fillcolor%20%3D%20%22%23F2E4C8%22%20%5D%0A%20%20O%20%5B%20fillcolor%20%3D%20%22%23CBCBCB%22%20%5D%0A%7D" />

## API parameters

The `https://quickchart.io/graphviz` endpoint supports HTTP GET requests with the following parameters:

- **graph** - the DOT graph description (required)
- **layout** - the name of the graph layout engine (default `dot`)
- **format** - the output format, either png or svg (default `svg`)
- **width** - width of image, applicable to png only (defaults to fit)
- **height** - height of image, applicable to png only (defaults to fit)

The API also supports HTTP POST requests with JSON payloads. Here's an example payload:

```json
{
  "graph": "digraph {a->b}",
  "layout": "dot",
  "format": "svg"
}
```

## Example requests

You can hit the GET or POST endpoint using any HTTP client package available in your preferred programming language.

Here's an example of a POST request in node.js:

```js
const fetch = require('node-fetch');

const body = {
  graph: 'digraph {a->b}',
  layout: 'dot',
  format: 'svg',
};

const response = await fetch('https://quickchart.io/graphviz', {
  method: 'post',
  body: JSON.stringify(body),
  headers: { 'Content-Type': 'application/json' },
});

// Response contains an SVG. Write it to file or send it someplace else.
const svg = await response.text();
console.log(svg);
```

The same request in Python:

```python
import requests

body = {
  "graph": "digraph {a->b}",
  "layout": "dot",
  "format": "svg"
}

r = requests.post('https://quickchart.io/graphviz', json=body)

# r.text is sufficient for SVG. Use `r.raw` for png images
svg = r.text
```

And finally, here's a generic equivalent using `curl`:

```bash
# In payload.json:
{
  "graph": "digraph {a->b}",
  "layout": "dot",
  "format": "png"
}

# Then run:
curl -X POST 'https://quickchart.io/graphviz' -H 'Content-Type: application/json' -d @payload.json -o render.png
```

Give it a try now and [reach out](https://community.quickchart.io/) if you have any questions!

<Author />
