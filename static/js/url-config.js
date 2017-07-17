export default {
  //监狱资金明细
  fund_detail:{
    downloadExcelUrl:'http://106.14.18.98:8080/icmaker/prisonCapital/downFiles',//资金明细列表导出excel文件下载接口
  },

  //罪犯资金明细查询
  criminal_fund_detail:{
    downloadExcelUrl: 'http://106.14.18.98:8080/icmaker/downFiles',//罪犯资金明细excel文件下载接口
  },

  //罪犯资金分配
  criminal_fund_distribution:{
    uploadExcelUrl:'http://106.14.18.98:8080/icmaker/importPrisonerCapitalIncome',//罪犯资金分配模板上传接口
    downloadExcelUrl:'http://106.14.18.98:8080/icmaker/downTemplate',//罪犯资金分配模板下载接口
  },

  //取现
  cash_out:{
    uploadExcelUrl:'http://106.14.18.98:8080/icmaker/prisonerAccount/importPrisonerBatchApply',//取现模板上传接口
    downloadExcelUrl:'http://106.14.18.98:8080/icmaker/downTemplate',//取现模板下载接口
  },

  //罪犯查询
  criminal_search:{
    downloadExcelUrl:'http://106.14.18.98:8080/icmaker/prisoner/downFiles',//罪犯查询下载接口
  },

  //罪犯分级申请
  criminal_level_application:{
    uploadExcelUrl:'http://106.14.18.98:8080/icmaker/level/importPrisonerLevel',//罪犯分级查询申请模板上传接口
    downloadExcelUrl:'http://106.14.18.98:8080/icmaker/level/downLevelTemplate',//罪犯分级查询申请模板下载接口
  }
}
