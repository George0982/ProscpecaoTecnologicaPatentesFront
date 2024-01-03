import {
    camelCase as _camelCase,
    kebabCase as _kebabCase
} from 'lodash-es'

export function PrependObjectKeys (obj, appendKey) {
    const newObj = {}

    Object.entries(obj).forEach(function ([key, value]) {
        newObj[appendKey + key] = value
    })

    return newObj
}

export function UnPrependObjectKeys (obj, startWith) {
    const newObj = {}

    Object.entries(obj).forEach(([key, value]) => {
        const _key = _kebabCase(key)
        if (_key.startsWith(startWith)) {
            const newKey = _camelCase(_key.replace(startWith, ''))
            newObj[newKey] = value
        }
    })

    return newObj
}
