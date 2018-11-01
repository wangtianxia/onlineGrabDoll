/**
 * Created by Bkz on 2018/9/20.
 */
let config = {
    dev:{
        url:"https://h5wwj.xintiao100.com/development/dist/game/",
        '101':{//篮球
            alert:false
        },
        '103':{//篮球
            alert:false
        },
        "102":{//10s
            alert:false
        },
        "104":{//10s
            alert:false
        }
    },
    //正式服
    pro:{
        url:'https://wwjcdn.like000.com/videoDollCatcher/newGame/',
        "101":{ //篮球
            v:'0.1.3',
            alert:false
        },
        "102":{// 抢 10s
            v:'0.1.1',
            alert:false
        },
        '104':{//飞刀挑战
            v:'0.0.6',
            alert:false
        }
    }
};
export default config