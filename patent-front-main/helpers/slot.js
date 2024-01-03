export function slot (vm, slotName, otherwise) {
    return vm.$scopedSlots[slotName] !== undefined
        ? vm.$scopedSlots[slotName]()
        : otherwise
}

export function slotScope (vm, slotName, slotProps, otherwise) {
    return vm.$scopedSlots[slotName] !== undefined
        ? vm.$scopedSlots[slotName](slotProps)
        : otherwise
}
