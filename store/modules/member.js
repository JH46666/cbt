import $api from '../../api'
const state = {
    member: {},
    memberAccount: {},
    orgDTO: {},
    shop: {},
    thirdAccount: {},
    sign: {},
    redpacket: {
        total: 0,
        UNUSED: [],
        USED: [],
        EXPIRED: []
    }
}

const mutations = {
    SET_MEMBERDATA(state,obj) {
        state[obj.type] = obj.val;
    },
    SET_REDPACKET(state,obj) {
        state.redpacket[obj.type] = obj.val;
    }
}

const actions = {
    // 获取会员信息
    getMemberData() {
        return new Promise((resolve,reject) => {
            $api.get('/oteao/memberAccount/getSessionMember',{},res => {
                for (let attr in res.data) {
                    this.commit('SET_MEMBERDATA',{type:attr,val:res.data[attr]})
                }
                this.dispatch('viewSign')
                this.dispatch('getRedTotal')
                resolve(res.data);
            })
        })
    },
    // 查看会员是否签到
    viewSign() {
        $api.get('/member/memberRecord/searchIsSignIn',{
            memberId: this.state.member.member.id,
            sysId: 1
        },res => {
            this.commit('SET_MEMBERDATA',{type:'sign',val:res.data})
        })
    },
    // 获取红包个数
    getRedTotal() {
        $api.get('/member/redPacket/countRedPack',{
            memberId: this.state.member.member.id,
            sysId: 1
        },res => {
            this.commit('SET_REDPACKET',{type:'total',val:res.data.total})
        })
    }
}



export default {
    state,
    mutations,
    actions
}