import { PATH_CHANGE, PATH_GET } from '../types/path'

const pathChange = (path) => {
  return {
    type: PATH_CHANGE,
    payload: path
  }
}
export {pathChange}
