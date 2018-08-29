var prodsTools = {}

// 从本地存储取出数据操作
let prods = JSON.parse(window.localStorage.getItem('prods') || '{}')

// 增 我们需要的传进来{id:num}
prodsTools.addProds = function (p) {
  // 如果存在
  if (prods[p.id]) {
    prods[p.id] += p.num
  } else {
    prods[p.id] = p.num
  }
  this.save()
}
// 删
prodsTools.deleteProds = function (id) {
  delete prods[id]
  this.save()
}
// 查
prodsTools.getprods = function () {
  return prods
}
// 获取总数量
prodsTools.getTotalNum = function () {
  let num = 0
  for (var id in prods) {
    num += prods[id]
  }
  return num
}


// 以上更改操作需要保存
prodsTools.save = function () {
  window.localStorage.setItem('prods', JSON.stringify(prods))
}


export default prodsTools
