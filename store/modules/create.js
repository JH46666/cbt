const create = {
    state: {
        resize: {
            form: {
                goodTypes: '',
                goodsName: '',
                goodsSell: '',
                goodsDw: '',
                goodsBrand: '其他品牌',
                goodsJz: '',
                goodsMz: '',
                goodsKc: '',
                goodsSj: '',
                goodsPtsj: '',
                goodsGoodType: '',
            },
            selIndex: {
                dw: null,
                pp: null
            },
            selId: {
                dw: null,
                pp: null
            },
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
            mainImgFile: [],
            oneImgFile: [],
            secondImgFile: [],
            thirdImgFile: [],
            fourImgFile: [],
            proValList: [],
            mainId: 0,
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
