import Mock from 'mockjs'

Mock.mock('/auth/login', {
  code: 0,
  message: '登录成功',
  data: {
    access_token: 'access_token',
    account: '15888888888'
  }
})

Mock.mock('/upload', {
  code: 0,
  message: 'successs',
  data: {
    url: '//img14.360buyimg.com/n1/jfs/t1/58236/23/2337/358377/5d03632cEe3ea3a66/302f4bca3823a6fb.jpg'
  }
})

Mock.mock('/book/list', {
  code: 0,
  message: '操作成功',
  data: {
    current_page: 1,
    data: [{
      id: 1,
      title: '说说你想读什么书',
      desc: '你该读书了',
      is_public: 1,
      image: '//img14.360buyimg.com/n1/jfs/t1/58236/23/2337/358377/5d03632cEe3ea3a66/302f4bca3823a6fb.jpg',
      order_value: 1,
      created_at: '2019-07-23 00:16:06',
      updated_at: '2020-07-22 16:50:41',
      deleted_at: null
    }, {
      id: 5,
      title: '探索万古星辰',
      desc: '宇宙的秘密',
      is_public: 1,
      image: '//img11.360buyimg.com/n1/jfs/t1/127804/28/7640/517528/5f17b640E6f3d7448/eda897ad69031638.jpg',
      order_value: 0,
      created_at: '2019-07-23 21:24:59',
      updated_at: '2020-07-13 13:10:12',
      deleted_at: null
    }, {
      id: 3,
      title: '读书是一种陪伴',
      desc: '读书是一种陪伴',
      is_public: 1,
      image: '//img14.360buyimg.com/n1/jfs/t1/141248/39/6580/686587/5f45fde8Ea0111fa5/e82fd7373a70e83b.jpg',
      order_value: 0,
      created_at: '2019-07-23 00:27:44',
      updated_at: '2020-08-03 21:44:02',
      deleted_at: null
    }, {
      id: 2,
      title: '深夜安静的躺着读书',
      desc: '深夜安静的躺着读书',
      is_public: 1,
      image: '//img10.360buyimg.com/n1/jfs/t1/104968/21/17082/405932/5e819d6fEb10c3d64/408ce3ee8306e661.jpg',
      order_value: 0,
      created_at: '2019-07-23 00:20:46',
      updated_at: '2020-08-18 11:05:20',
      deleted_at: null
    }],
    last_page: 1,
    per_page: 2,
    total: 4
  }
})

export default Mock
