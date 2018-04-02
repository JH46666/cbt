
const getters = {
    orderStatus: state => state.order.status,
    cartData: state => state.cart.cartData,
    resize: state => state.create.resize,
    member: state => state.member.member,
}

export default getters
