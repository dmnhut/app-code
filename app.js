var INF = 9999;
var NO_EDGE = 0;

function List() {
  this.size = 0;
  this.data = [];
  this.make_null = function() {
    this.size = 0;
  };
  this.push_back = function(x) {
    this.data[this.size] = x;
    this.size += 1;
  };
  this.element_at = function(i) {
    return this.data[i - 1];
  };
  this.count_list = function() {
    return this.size;
  };
}

function Graph(n) {
  this.n = n;
  this.A = [];
  this.init_graph = function() {
    for (var i = 1; i <= this.n; i++) {
      this.A[i] = [];
    }
    this.A = this.A.map(function(val) {
      val = [];
      return val;
    });
  };
  this.add_edge = function(x, y, z) {
    this.A[y][x] = z;
    this.A[x][y] = z;
  };
  this.adjacent = function(x, y) {
    return this.A[x][y] !== 0;
  };
  this.degree = function(x) {
    var deg = 0;
    for (var y = 1; y < this.n; y++) {
      deg += this.A[x][y];
    }
    return deg;
  };
  this.distanceFrom = function(u, S) {
    var min_dist = INF;
    var min_v = -1;
    for (var i = 1; i <= S.size; i++) {
      var v = S.element_at(i);
      if (this.A[u][v] !== NO_EDGE && min_dist > this.A[u][v]) {
        min_dist = this.A[u][v];
        min_v = v;
      }
    }
    return min_v;
  };
}

function Prim(G, T) {
  this.G = G;
  this.T = T;
  this.sum_w;
  this.result;
  this.do = function() {
    var mark = [];
    var S = new List();
    this.sum_w = 0;
    S.make_null();
    for (var i = 1; i <= this.G.n; i++) {
      mark[i] = 0;
    }
    S.push_back(1);
    mark[1] = 1;
    for (i = 1; i < this.G.n; i++) {
      var min_dist = INF;
      var min_u;
      var min_v;
      for (var u = 1; u <= this.G.n; u++) {
        if (mark[u] == 0) {
          var v = this.G.distanceFrom(u, S);
          if (v != -1 && this.G.A[u][v] < min_dist) {
            min_dist = this.G.A[u][v];
            min_u = u;
            min_v = v;
          }
        }
      }
      S.push_back(min_u);
      mark[min_u] = 1;
      this.T.add_edge(min_u, min_v, min_dist);
      this.sum_w += min_dist;
    }

    var arr = [];
    for (i = 1; i <= this.T.n; i++) {
      for (var j = 1; j <= this.T.n; j++) {
        if (this.T.A[i][j] != NO_EDGE && j > i) {
          if (!isNaN(this.T.A[i][j])) {
            arr.push(new Node(i, j, this.T.A[i][j]));
          }
        }
      }
    }

    this.result = arr;
  };
}

function Node(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

$(document).ready(function() {
  $("#txta").val("0");
  $("#btn-run").click(function() {
    var txt;
    txt = $("#txta").val();
    txt = txt.split("\n");
    txt = txt.map(function(val) {
      val = val.split(" ").map(function(num) {
        return Number(num);
      });
      return val;
    });

    var n = txt.shift();
    n = n.shift();
    var G = new Graph(n, []);
    G.init_graph();
    for (var i = 0; i < txt.length; i++) {
      G.add_edge(txt[i][0], txt[i][1], txt[i][2]);
    }

    var T = new Graph(G.n, []);
    T.init_graph();

    var prim = new Prim(G, T);
    prim.do();

    //console.log(prim.sum_w);
    //console.log(prim.result);
    //console.log(prim.T.A);
    $("#txt").html(prim.sum_w);
  });
});
