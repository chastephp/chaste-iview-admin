export const page = {
  name: '管理员',
  api: 'admin',
  editRoute: { name: '/auth/admin/edit' },
  listRoute: { name: '/auth/admin/list' }
}

export const config = {
  is_lock: [{ key: 0, val: '正常' }, { key: 1, val: '锁定' }]
}
