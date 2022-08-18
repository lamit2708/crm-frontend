var data = [
  {
    id: 1,
    name: "Ngoại khoa",
    des: "Nhóm dịch vụ ngoại khoa",
    unit: "",
    price: "",
    currency: "",
    img: "link img",
    pId: null,
    rId: 1,
    depth: 1,
    hasChild: false,
  },
  {
    id: 2,
    name: "Nội khoa",
    des: "Nhóm dịch vụ nội khoa",
    unit: "",
    price: "",
    currency: "",
    img: "link img",
    pId: null,
    rId: 2,
    depth: 1,
    hasChild: true,
  },
  {
    id: 3,
    name: "Tai Mũi Họng",
    des: "Nhóm dịch vụ TMH",
    unit: "",
    price: "",
    currency: "",
    img: "link img",
    pId: null,
    rId: 3,
    depth: 1,
    hasChild: false,
  },
  {
    id: 4,
    name: "Tiêu hóa",
    des: "Nhóm dịch vụ Tiêu hóa",
    unit: "",
    price: "",
    currency: "",
    img: "link img",
    pId: 2,
    rId: 2,
    depth: 2,
    hasChild: false,
  },
  {
    id: 5,
    name: "Nội soi",
    des: "Nhóm dịch vụ Nội soi",
    unit: "",
    price: "",
    currency: "",
    img: "link img",
    pId: 2,
    rId: 2,
    depth: 2,
    hasChild: false,
  },
  {
    id: 6,
    name: "Nâng mũi",
    des: "Nâng mũi theo yêu cầu của khách",
    unit: "ca",
    price: "20,000,000",
    currency: "VND",
    img: "link img",
    pId: 2,
    rId: 2,
    depth: 2,
    hasChild: false,
  },
];

var tempCurId = 6;

class ServicesService {
  getAll() {
    return data;
  }

  getChildService(pId) {
    var rs = data.filter((el) => el.pId == pId);
    return rs;
  }

  getService(id) {
    var rs = data.filter((el) => el.id == id);
    return rs;
  }

  create(objService, pId) {
    var pService = pId == null ? null : this.getService(pId);
    data.push({
      id: tempCurId,
      name: objService.name,
      des: objService.des,
      unit: objService.unit,
      price: objService.price,
      currency: objService.currency,
      img: objService.img,
      pId: pId,
      rId: pId == null ? pId : pService.rId,
      depth: pId == null ? 1 : parseInt(pService.depth) + 1,
      hasChild: false,
    });
    tempCurId++;
  }

  delete(id) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        data.slice(i, 1);
      }
    }
  }

  update(objService) {
    var service = this.getService(objService.id);
    var newService = Object.assign({}, service, objService);
    this.delete(service.id);
    data.push(newService);
  }
}

export default new ServicesService();
