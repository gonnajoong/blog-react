const standards = {
    defaultSize: 12,
    upload: {
        dirCompany: 'company',
        dirUser: 'user',
        dirEvent: 'event',
        prefixL: 'l_',
        prefixT: 't_',
        prefixList: {
            company: [{
                key: 'l_',
                width: 1200,
                height: 800
            }, {
                key: 't_',
                width: 720,
                height: 440
            }],
            event: [{
                key: 'l_',
                width: 1200,
                height: 800
            }, {
                key: 't_',
                width: 720,
                height: 440
            }]
        }
    },
    terms: {
        enumTypes: ['service', 'privacy', 'location'],
        defaultType: 'service'
    },
    notice: {
        enumTypes: ['common', 'company'],
        defaultType: 'common',
        typeCommon: 'common',
        typeCompany: 'company'
    },
    deviceToken: {
        enumPlatforms: ['android', 'ios'],
        defaultPlatform: 'android',
        enumTypes: ['fcm'],
        defaultType: 'fcm'
    },
    deviceVersion: {
        enumPlatforms: ['android', 'ios'],
        defaultPlatform: 'android',
    },
    deviceMarket: {
        enumPlatforms: ['android', 'ios'],
        defaultPlatform: 'android',
    },
    companyUser: {
        enumStates: ['standby', 'authorized', 'unauthorized'],
        defaultState: 'standby',
        stateStandby: 'standby',
        stateAuthorized: 'authorized',
        stateUnauthorized: 'unauthorized'
    },
    companyComment: {
        enumStates: ['request', 'authorized', 'unauthorized', 'blindRequest', 'blind'],
        defaultState: 'request',
        stateRequest: 'request',
        stateAuthorized: 'authorized',
        stateUnauthorized: 'unauthorized',
        stateBlindRequest: 'blindRequest',
        stateBlind: 'blind'
    },
    companyInquiry: {
        enumInquiryTypes: ['common'],
        defaultInquiryType: 'common'
    },
    userSocialInfo: {
        enumTypes: ['kakao'],
        defaultType: 'kakao'
    },
    callHistory: {
        enumStates: ['fail', 'success'],
        defaultState: 'fail',
        stateFail: 'fail',
        stateSuccess: 'success'
    },
    inquiry: {
        enumTypes: ['common', 'photo'],
        defaultType: 'common',
        maxContentsLength: 1000,
        maxReplyLength: 1000
    },
    calculation: {
        enumTypes: ['call', 'use'],
        defaultType: 'call',
        typeCall: 'call',
        typeUse: 'use',
        enumStates: ['standby', 'complete'],
        defaultState: 'standby',
        stateStandby: 'standby',
        stateComplete: 'complete'
    },
    socialPage: {
        enumTypes: ['facebook', 'instagram', 'twitter', 'youtube'],
        defaultType: 'facebook'
    }
};

module.exports = standards;
