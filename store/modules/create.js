const create = {
    state: {
        resize: {
            form: {
                goodTypes: '',
                // goodsName: '',
                goodsSell: '',                          // 商品卖点
                // goodsDw: '',
                goodsBrand: '其他品牌',
                // goodsJz: '',
                goodsMz: '',                            // 重量
                goodsKc: '',                            // 库存
                goodsPtsj: '',                          // 市场价
                goodsSj: '',                            // 单买价
                // goodsGoodType: '',
                goodsGroup:'',                          // 团购价
                goodsGroupNum:'',                       // 团购人数
                goodsCzjj:'',                           // 采摘季节
                goodsCd: '',                            // 产地
                goodsSize:'',                           // 规格
                goodsSave: '',                          // 储存方法
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
                mainImg: [],            //主图
                detailImg1: [],         //详情图片1
                detailImg2: [],         //详情图片2
                detailImg3: [],         //详情图片3
                imgsStep4: []           //详情4
            },
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
            mainId: null,
            defaultArray: [
                {
                    name: '香气',
                    select: null,
                    content: '',
                    showOfHide: false,
                    prop: ['偏淡','一般','香','高香','极香']
                },
                {
                    name: '滋味',
                    select: null,
                    content: '',
                    showOfHide: false,
                    prop: ['偏淡','一般','浓','很浓','极浓']
                }
            ],
        }
    },
    mutations: {
        SET_RESIZE(state){
            state.resize = {
                form: {
                    goodTypes: '',
                    // goodsName: '',
                    goodsSell: '',
                    // goodsDw: '',
                    goodsBrand: '其他品牌',
                    // goodsJz: '',
                    goodsMz: '',
                    goodsKc: '',
                    goodsPtsj: '',
                    goodsSj: '',
                    // goodsGoodType: '',
                    goodsGroup: '',                          // 团购价
                    goodsGroupNum: '',                       // 团购人数
                    goodsCzjj: '',                           // 采摘季节
                    goodsCd: '',                             // 产地
                    goodsSize: '',                           // 规格
                    goodsSave: '',                           // 储存方法
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
                    mainImg: [],            //主图
                    detailImg1: [],         //详情图片1
                    detailImg2: [],         //详情图片2
                    detailImg3: [],         //详情图片3
                    imgsStep4: []           //详情4
                },
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
                mainId: null,
                defaultArray: [
                    {
                        name: '香气',
                        select: null,
                        content: '',
                        showOfHide: false,
                        prop: ['偏淡','一般','香','高香','极香']
                    },
                    {
                        name: '滋味',
                        select: null,
                        content: '',
                        showOfHide: false,
                        prop: ['偏淡','一般','浓','很浓','极浓']
                    }
                ],
            };
        }
    },
    actions: {

    }
}
export default create
