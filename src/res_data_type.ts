// roles
export type roleType = {
  id: number
  roleName: string
  roleType: number
  rights: string[]
}

// regions
export type regionType = {
  id: number
  title: string
  value: string
}

// users
export type userType = {
  id: number
  username: string
  password: string | number
  roleState: boolean
  default: boolean
  region: string
  roleId: number
  role: roleType
}
