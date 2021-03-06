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
        EXPIRED: [],
        UNUSEDNUM: 0,
        USEDNUM: 0,
        EXPIREDNUM: 0 
    }
}

const mutations = {
    SET_MEMBERDATA(state,obj) {
        state[obj.type] = obj.val;
    },
    SET_REDPACKET(state,obj) {
        if(obj.val === null) obj.val = [];
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
                resolve(res.data);
            },res => {
                reject(res)
            })
        })
    },
    // 查看会员是否签到
    viewSign({state,commit}) {
        $api.get('/oteao/member/memberRecord/searchIsSignIn',{
            memberId: state.member.id,
            sysId: 1
        },res => {
            commit('SET_MEMBERDATA',{type:'sign',val:res.data})
        })
    },
    // 获取红包个数
    getRedTotal({state,commit}) {
        $api.get('/oteao/member/redPacket/countRedPack',{
            memberId: state.member.id,
            sysId: 1
        },res => {
            commit('SET_REDPACKET',{type:'total',val:res.data.total})
        })
    },
    // 获取红包列表
    getRedList({state,commit,dispatch},obj) {

        let getData = (resolve,reject) => {
            obj.id = state.member.id;
            $api.get('/oteao/member/redPacket/searchRedPacketByStatus',{
                'page.pageNumber': obj.page || 1,
                'page.pageSize': 10,
                'memberId': obj.id,
                'status': obj.type,
                'sysId': 1
            },res => {
                resolve(res)
            },res => {})
        }

        return new Promise((resolve,reject) => {
            // 刷新后重新获取会员
            if(state.member.id) {
                getData(resolve,reject)
            } else {
                dispatch('getMemberData').then(res => {
                    getData(resolve,reject);
                },res =>{
                    reject(res);
                })
            }
        })
    }
}



export default {
    state,
    mutations,
    actions
}