// 百度地图预定义的样式
const preSetCustomId = ['dark', 'midnight', 'grayscale', 'hardedge', 'light', 'redalert', 'googlelite', 'grassgreen', 'pink', 'darkgreen', 'bluish'];

const webTileProviders = {
  tianditu: {
    vec: {
      map: 'http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}',
      anno: 'http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}'
    },
    img: {
      map: 'http://t{s}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}',
      anno: 'http://t{s}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}'
    },
    ter: {
      map: 'http://t{s}.tianditu.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}',
      anno: 'http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}'
    },
    Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
  },

  amap: {
    vec: {
      map: 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
    },
    img: {
      map: 'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
      anno: 'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
    },
    Subdomains: ['1', '2', '3', '4']
  },

  google: {
    vec: {
      map: 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'
    },
    img: {
      map: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
    },
    ter: {
      map: 'http://www.google.cn/maps/vt?lyrs=t@189&gl=cn&x={x}&y={y}&z={z}'
    },
    Subdomains: []
  },

  baidu: {
    vec: {
      map: 'http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=$&scaler=1&p=1'
    },
    img: {
      map: 'http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46',
      anno: 'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=$&v=020'
    },
    tmc: {
      map: 'http://its.map.baidu.com:8002/traffic/TrafficTileService?x={x}&y={y}&level={z}&time=$&label=web2D&v=017'
    },
    custom: {
      map: ''
    },
    Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  },

  open: {
    street: {
      map: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    },
    Subdomains: ['a', 'b', 'c']
  },

  geoq: {
    normal: {
      map: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
      color: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetColor/MapServer/tile/{z}/{y}/{x}',
      purplishblue: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
      gray: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
      warm: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}',
      cold: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetCold/MapServer/tile/{z}/{y}/{x}'
    },
    Subdomains: []
  }
};

export const getWebTileOptions = (type, option) => {
  let providers = webTileProviders;

  let parts = type.split('.');
  let providerName = parts[0];
  let mapName = parts[1];
  let mapType = parts[2];

  let url = providers[providerName][mapName][mapType];
  let subdomains = providers[providerName].Subdomains;

  // 针对百度地图进行特殊处理
  if (type === 'baidu.vec.map') {
    if (option.bigfont) {
      url = url.replace('$', 'ph');
    } else {
      url = url.replace('$', 'pl');
    }
  } else if (type === 'baidu.img.anno') {
    if (option.bigfont) {
      url = url.replace('$', 'sh');
    } else {
      url = url.replace('$', 'sl');
    }
  } else if (type === 'baidu.tmc.map') {
    let time = new Date().getTime();
    url = url.replace('$', time);
  } else if (type === 'baidu.custom.map') {
    subdomains = ['0', '1', '2'];
    url = 'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&udt=20180904&';
    if (option.style) {
      let style = option.style;
      // 使用预定义样式
      if (preSetCustomId.indexOf(style) > -1) {
        url = url + 'customid=' + style;
      } else {
        url = url + 'styles=' + style;
      }
    } else {
      url = url + 'customid=midnight';
    }
  }

  let opts = {
    url: url,
    subdomains: subdomains
  };
  if (providerName === 'baidu') {
    opts.tms = true;
  }

  console.log(providerName + ' - layer option:' + JSON.stringify(opts));

  return opts;
};
