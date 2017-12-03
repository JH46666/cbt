const create = {
    state: {
        resize: {
            form: {
                goodTypes: '',
                goodsName: '',
                goodsSell: '',
                goodsDw: '',
                goodsBrand: '其他品牌',
                goodsXq: '',
                goodsZw: '',
                goodsJz: '',
                goodsMz: '',
                goodsKc: '',
                goodsSj: '',
                goodsSx: '',
                goodsJj: '',
                goodsCd: '',
                goodsGg: '',
                goodsCc: '',
                goodsPtsj: '',
                goodsGoodType: '',
            },
            selIndex: {
                dw: null,
                pp: null,
                xq: null,
                zw: null
            },
            selId: {
                dw: null,
                pp: null,
                xq: null,
                zw: null
            },
            xiangWei: [
                {
                    id: 0,
                    name: '偏淡'
                },
                {
                    id: 1,
                    name: '一般'
                },
                {
                    id: 2,
                    name: '香'
                },
                {
                    id: 3,
                    name: '高香'
                },
                {
                    id: 4,
                    name: '极香'
                }
            ],
            ziWei: [
                {
                    id: 0,
                    name: '偏淡'
                },
                {
                    id: 1,
                    name: '一般'
                },
                {
                    id: 2,
                    name: '浓'
                },
                {
                    id: 3,
                    name: '很浓'
                },
                {
                    id: 4,
                    name: '极浓'
                }
            ],
            twoClass: null,
            oneClass: null,
            twoIndex: null,
            oneIndex: null,
            imgs:{
                detailImg1: '',     //详情图片1
                detailImg2: '',     //详情图片2
                detailImg3: '',     //详情图片3
            },
            mainImg: [],            //主图
            imgsStep4:[],           //详情4
            textMs1: '',
            textMs2: '',
            textMs3: '',
            textMs4: '',
            allImg: [],
        }
    },
    mutations: {
        SET_RESIZE(state,data){
            state.resize = data;
        }
    },
    actions: {

    }
}
export default create
