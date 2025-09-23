/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

function BranchData() {
    this.position = -1;
    this.nodeLength = -1;
    this.src = null;
    this.evalFalse = 0;
    this.evalTrue = 0;

    this.init = function init_$0(position, nodeLength, src) {
        this.position = position;
        this.nodeLength = nodeLength;
        this.src = src;
        return this;
    }

    this.ranCondition = function ranCondition_$1(result) {
        if (result)
            this.evalTrue++;
        else
            this.evalFalse++;
    };

    this.pathsCovered = function pathsCovered_$2() {
        var paths = 0;
        if (this.evalTrue > 0)
          paths++;
        if (this.evalFalse > 0)
          paths++;
        return paths;
    };

    this.covered = function covered_$3() {
        return this.evalTrue > 0 && this.evalFalse > 0;
    };

    this.toJSON = function toJSON_$4() {
        return '{"position":' + this.position
            + ',"nodeLength":' + this.nodeLength
            + ',"src":' + jscoverage_quote(this.src)
            + ',"evalFalse":' + this.evalFalse
            + ',"evalTrue":' + this.evalTrue + '}';
    };

    this.message = function message_$5() {
        if (this.evalTrue === 0 && this.evalFalse === 0)
            return 'Condition never evaluated         :\t' + this.src;
        else if (this.evalTrue === 0)
            return 'Condition never evaluated to true :\t' + this.src;
        else if (this.evalFalse === 0)
            return 'Condition never evaluated to false:\t' + this.src;
        else
            return 'Condition covered';
    };
}

BranchData.fromJson = function fromJson_$6(jsonString) {
    var json = eval('(' + jsonString + ')');
    var branchData = new BranchData();
    branchData.init(json.position, json.nodeLength, json.src);
    branchData.evalFalse = json.evalFalse;
    branchData.evalTrue = json.evalTrue;
    return branchData;
};

BranchData.fromJsonObject = function fromJsonObject_$7(json) {
    var branchData = new BranchData();
    branchData.init(json.position, json.nodeLength, json.src);
    branchData.evalFalse = json.evalFalse;
    branchData.evalTrue = json.evalTrue;
    return branchData;
};

function buildBranchMessage(conditions) {
    var message = 'The following was not covered:';
    for (var i = 0; i < conditions.length; i++) {
        if (conditions[i] !== undefined && conditions[i] !== null && !conditions[i].covered())
          message += '\n- '+ conditions[i].message();
    }
    return message;
};

function convertBranchDataConditionArrayToJSON(branchDataConditionArray) {
    var array = [];
    var length = branchDataConditionArray.length;
    for (var condition = 0; condition < length; condition++) {
        var branchDataObject = branchDataConditionArray[condition];
        if (branchDataObject === undefined || branchDataObject === null) {
            value = 'null';
        } else {
            value = branchDataObject.toJSON();
        }
        array.push(value);
    }
    return '[' + array.join(',') + ']';
}

function convertBranchDataLinesToJSON(branchData) {
    if (branchData === undefined) {
        return '{}'
    }
    var json = '';
    for (var line in branchData) {
        if (isNaN(line))
            continue;
        if (json !== '')
            json += ','
        json += '"' + line + '":' + convertBranchDataConditionArrayToJSON(branchData[line]);
    }
    return '{' + json + '}';
}

function convertBranchDataLinesFromJSON(jsonObject) {
    if (jsonObject === undefined) {
        return {};
    }
    for (var line in jsonObject) {
        var branchDataJSON = jsonObject[line];
        if (branchDataJSON !== null) {
            for (var conditionIndex = 0; conditionIndex < branchDataJSON.length; conditionIndex ++) {
                var condition = branchDataJSON[conditionIndex];
                if (condition !== null) {
                    branchDataJSON[conditionIndex] = BranchData.fromJsonObject(condition);
                }
            }
        }
    }
    return jsonObject;
}
function jscoverage_quote(s) {
    return '"' + s.replace(/[\u0000-\u001f"\\\u007f-\uffff]/g, function (c) {
        switch (c) {
            case '\b':
                return '\\b';
            case '\f':
                return '\\f';
            case '\n':
                return '\\n';
            case '\r':
                return '\\r';
            case '\t':
                return '\\t';
            // IE doesn't support this
            /*
             case '\v':
             return '\\v';
             */
            case '"':
                return '\\"';
            case '\\':
                return '\\\\';
            default:
                return '\\u' + jscoverage_pad(c.charCodeAt(0).toString(16));
        }
    }) + '"';
}

function getArrayJSON(coverage) {
    var array = [];
    if (coverage === undefined)
        return array;

    var length = coverage.length;
    for (var line = 0; line < length; line++) {
        var value = coverage[line];
        if (value === undefined || value === null) {
            value = 'null';
        }
        array.push(value);
    }
    return array;
}

function jscoverage_serializeCoverageToJSON() {
    var json = [];
    for (var file in _$jscoverage) {
        var lineArray = getArrayJSON(_$jscoverage[file].lineData);
        var fnArray = getArrayJSON(_$jscoverage[file].functionData);

        json.push(jscoverage_quote(file) + ':{"lineData":[' + lineArray.join(',') + '],"functionData":[' + fnArray.join(',') + '],"branchData":' + convertBranchDataLinesToJSON(_$jscoverage[file].branchData) + '}');
    }
    return '{' + json.join(',') + '}';
}

function jscoverage_parseCoverageJSON(data) {
    var result = {};
    var json = eval('(' + data + ')');
    var file;
    for (file in json) {
        var fileCoverage = json[file];
        result[file] = {};
        result[file].lineData = fileCoverage.lineData;
        result[file].functionData = fileCoverage.functionData;
        result[file].branchData = convertBranchDataLinesFromJSON(fileCoverage.branchData);
    }
    return result;
}

function jscoverage_pad(s) {
    return '0000'.substr(s.length) + s;
}

function jscoverage_html_escape(s) {
    return s.replace(/[<>\&\"\']/g, function (c) {
        return '&#' + c.charCodeAt(0) + ';';
    });
}
try {
  if (typeof top === 'object' && top !== null && typeof top.opener === 'object' && top.opener !== null) {
    // this is a browser window that was opened from another window

    if (! top.opener._$jscoverage) {
      top.opener._$jscoverage = {};
    }
  }
}
catch (e) {}

try {
  if (typeof top === 'object' && top !== null) {
    // this is a browser window

    try {
      if (typeof top.opener === 'object' && top.opener !== null && top.opener._$jscoverage) {
        top._$jscoverage = top.opener._$jscoverage;
      }
    }
    catch (e) {}

    if (! top._$jscoverage) {
      top._$jscoverage = {};
    }
  }
}
catch (e) {}

try {
  if (typeof top === 'object' && top !== null && top._$jscoverage) {
    this._$jscoverage = top._$jscoverage;
  }
}
catch (e) {}
if (! this._$jscoverage) {
  this._$jscoverage = {};
}
if (! _$jscoverage['/lconn/jscover.js']) {
  _$jscoverage['/lconn/jscover.js'] = {};
  _$jscoverage['/lconn/jscover.js'].lineData = [];
  _$jscoverage['/lconn/jscover.js'].lineData[15] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[32] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[71] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[72] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[74] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[75] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[77] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[78] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[81] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[83] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[84] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[86] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[96] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[97] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[98] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[99] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[100] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[101] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[103] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[104] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[106] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[107] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[108] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[109] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[110] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[111] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[112] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[114] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[117] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[118] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[132] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[133] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[134] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[135] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[136] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[138] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[152] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[153] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[154] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[155] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[156] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[157] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[159] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[160] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[161] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[162] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[163] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[164] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[165] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[166] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[167] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[168] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[169] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[174] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[176] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[177] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[178] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[179] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[180] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[181] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[182] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[183] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[188] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[191] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[193] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[205] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[206] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[207] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[208] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[209] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[210] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[212] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[224] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[225] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[226] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[227] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[228] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[229] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[230] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[231] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[232] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[233] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[234] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[235] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[236] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[240] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[241] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[242] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[243] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[247] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[249] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[265] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[266] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[269] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[270] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[273] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[274] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[275] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[277] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[278] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[281] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[286] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[287] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[289] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[290] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[293] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[297] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[299] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[315] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[316] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[317] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[319] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[321] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[347] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[348] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[349] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[350] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[352] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[353] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[357] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[358] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[359] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[361] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[363] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[365] = 0;
  _$jscoverage['/lconn/jscover.js'].lineData[367] = 0;
}
if (! _$jscoverage['/lconn/jscover.js'].functionData) {
  _$jscoverage['/lconn/jscover.js'].functionData = [];
  _$jscoverage['/lconn/jscover.js'].functionData[0] = 0;
  _$jscoverage['/lconn/jscover.js'].functionData[1] = 0;
  _$jscoverage['/lconn/jscover.js'].functionData[2] = 0;
  _$jscoverage['/lconn/jscover.js'].functionData[3] = 0;
  _$jscoverage['/lconn/jscover.js'].functionData[4] = 0;
  _$jscoverage['/lconn/jscover.js'].functionData[5] = 0;
  _$jscoverage['/lconn/jscover.js'].functionData[6] = 0;
  _$jscoverage['/lconn/jscover.js'].functionData[7] = 0;
  _$jscoverage['/lconn/jscover.js'].functionData[8] = 0;
  _$jscoverage['/lconn/jscover.js'].functionData[9] = 0;
  _$jscoverage['/lconn/jscover.js'].functionData[10] = 0;
}
if (! _$jscoverage['/lconn/jscover.js'].branchData) {
  _$jscoverage['/lconn/jscover.js'].branchData = {};
  _$jscoverage['/lconn/jscover.js'].branchData['32'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['32'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['32'][2] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['74'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['74'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['77'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['77'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['77'][2] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['77'][3] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['77'][4] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['77'][5] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['77'][6] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['97'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['97'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['100'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['100'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['103'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['103'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['107'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['107'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['109'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['109'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['110'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['110'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['110'][2] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['111'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['111'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['133'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['133'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['154'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['154'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['156'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['156'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['160'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['160'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['161'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['161'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['163'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['163'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['166'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['166'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['168'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['168'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['176'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['176'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['180'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['180'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['182'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['182'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['206'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['206'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['208'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['208'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['228'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['228'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['228'][2] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['228'][3] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['230'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['230'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['231'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['231'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['232'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['232'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['233'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['233'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['240'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['240'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['269'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['269'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['273'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['273'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['274'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['274'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['277'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['277'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['286'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['286'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['289'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['289'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['316'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['316'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['349'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['349'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['352'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['352'][1] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['352'][2] = new BranchData();
  _$jscoverage['/lconn/jscover.js'].branchData['357'] = [];
  _$jscoverage['/lconn/jscover.js'].branchData['357'][1] = new BranchData();
}
_$jscoverage['/lconn/jscover.js'].branchData['357'][1].init(29, 11, '_u.fragment');
function visit6360_357_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['357'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['352'][2].init(44, 30, '_u.fragment.indexOf("!") === 0');
function visit6359_352_2(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['352'][2].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['352'][1].init(29, 45, '_u.fragment && _u.fragment.indexOf("!") === 0');
function visit6358_352_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['352'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['349'][1].init(43, 29, 'comp || ibmConfig.serviceName');
function visit6357_349_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['349'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['316'][1].init(11, 7, '!urlStr');
function visit6356_316_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['316'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['289'][1].init(103, 26, 'svcRefConfig.secureEnabled');
function visit6355_289_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['289'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['286'][1].init(14, 16, 'svcRefConfig.url');
function visit6354_286_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['286'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['277'][1].init(119, 16, 'svcRefConfig.url');
function visit6353_277_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['277'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['274'][1].init(14, 26, 'svcRefConfig.secureEnabled');
function visit6352_274_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['274'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['273'][1].init(207, 17, 'secure_ || secure');
function visit6351_273_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['273'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['269'][1].init(101, 13, '!svcRefConfig');
function visit6350_269_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['269'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['240'][1].init(25, 15, 'out.length == 0');
function visit6349_240_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['240'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['233'][1].init(31, 15, 'out.length == 0');
function visit6348_233_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['233'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['232'][1].init(79, 9, 'values[i]');
function visit6347_232_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['232'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['231'][1].init(32, 17, 'i < values.length');
function visit6346_231_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['231'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['230'][1].init(60, 20, 'dojo.isArray(values)');
function visit6345_230_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['230'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['228'][3].init(78, 14, 'values != null');
function visit6344_228_3(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['228'][3].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['228'][2].init(46, 28, 'typeof values != "undefined"');
function visit6343_228_2(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['228'][2].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['228'][1].init(46, 46, 'typeof values != "undefined" && values != null');
function visit6342_228_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['228'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['208'][1].init(47, 22, 'typeof uri == "string"');
function visit6341_208_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['208'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['206'][1].init(11, 4, '!uri');
function visit6340_206_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['206'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['182'][1].init(311, 8, 'existing');
function visit6339_182_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['182'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['180'][1].init(222, 22, 'dojo.isArray(existing)');
function visit6338_180_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['180'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['176'][1].init(505, 13, 'separator > 0');
function visit6337_176_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['176'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['168'][1].init(203, 8, 'existing');
function visit6336_168_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['168'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['166'][1].init(117, 22, 'dojo.isArray(existing)');
function visit6335_166_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['166'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['163'][1].init(67, 15, 'separator == -1');
function visit6334_163_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['163'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['161'][1].init(231, 18, 'args[i].length > 0');
function visit6333_161_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['161'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['160'][1].init(195, 15, 'i < args.length');
function visit6332_160_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['160'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['156'][1].init(76, 22, 'query.charAt(0) == "?"');
function visit6331_156_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['156'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['154'][1].init(34, 6, '!query');
function visit6330_154_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['154'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['133'][1].init(11, 8, 'url && p');
function visit6329_133_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['133'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['111'][1].init(395, 12, 'obj.fragment');
function visit6328_111_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['111'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['110'][2].init(334, 26, 'obj.query.charAt(0) != "?"');
function visit6327_110_2(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['110'][2].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['110'][1].init(334, 27, '(obj.query.charAt(0) != "?")');
function visit6326_110_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['110'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['109'][1].init(304, 9, 'obj.query');
function visit6325_109_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['109'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['107'][1].init(213, 19, 'obj.queryParameters');
function visit6324_107_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['107'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['103'][1].init(126, 13, 'obj.authority');
function visit6323_103_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['103'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['100'][1].init(69, 10, 'obj.scheme');
function visit6322_100_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['100'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['97'][1].init(11, 4, '!obj');
function visit6321_97_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['97'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['77'][6].init(162, 23, 'typeof uri2 != "string"');
function visit6320_77_6(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['77'][6].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['77'][5].init(162, 40, 'typeof uri2 != "string" && console.trace');
function visit6319_77_5(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['77'][5].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['77'][4].init(154, 48, 'uri2 && typeof uri2 != "string" && console.trace');
function visit6318_77_4(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['77'][4].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['77'][3].init(109, 22, 'typeof uri != "string"');
function visit6317_77_3(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['77'][3].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['77'][2].init(109, 39, 'typeof uri != "string" && console.trace');
function visit6316_77_2(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['77'][2].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['77'][1].init(109, 94, '(typeof uri != "string" && console.trace) || (uri2 && typeof uri2 != "string" && console.trace)');
function visit6315_77_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['77'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['74'][1].init(54, 4, '!uri');
function visit6314_74_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['74'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['32'][2].init(352, 34, 'window.location.protocol || "http"');
function visit6313_32_2(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['32'][2].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].branchData['32'][1].init(352, 63, '(window.location.protocol || "http").replace(\':\', \'\') == "https"');
function visit6312_32_1(result) {
  _$jscoverage['/lconn/jscover.js'].branchData['32'][1].ranCondition(result);
  return result;
}_$jscoverage['/lconn/jscover.js'].lineData[15]++;
define("lconn/jscover",['jazz/inverted!ic-core/proxy', 'ic-core/util/Url'], function(proxy, Url) {
  _$jscoverage['/lconn/jscover.js'].functionData[0]++;
  _$jscoverage['/lconn/jscover.js'].lineData[32]++;
  var secure_ = visit6312_32_1((visit6313_32_2(window.location.protocol || "http")).replace(':', '') == "https");
  _$jscoverage['/lconn/jscover.js'].lineData[71]++;
  function parse(uri, uri2) {
    _$jscoverage['/lconn/jscover.js'].functionData[1]++;
    _$jscoverage['/lconn/jscover.js'].lineData[72]++;
    var l = arguments.length, u = null;
    _$jscoverage['/lconn/jscover.js'].lineData[74]++;
    if (visit6314_74_1(!uri)) {
      _$jscoverage['/lconn/jscover.js'].lineData[75]++;
      return null;
    } else {
      _$jscoverage['/lconn/jscover.js'].lineData[77]++;
      if (visit6315_77_1((visit6316_77_2(visit6317_77_3(typeof uri != "string") && console.trace)) || (visit6318_77_4(uri2 && visit6319_77_5(visit6320_77_6(typeof uri2 != "string") && console.trace))))) {
        _$jscoverage['/lconn/jscover.js'].lineData[78]++;
        throw "Arguments for URI must be a string";
      }
    }
    _$jscoverage['/lconn/jscover.js'].lineData[81]++;
    uri = new dojo._Url(uri, uri2);
    _$jscoverage['/lconn/jscover.js'].lineData[83]++;
    uri.queryParameters = getRequestParameters(uri);
    _$jscoverage['/lconn/jscover.js'].lineData[84]++;
    return uri;
  }
  _$jscoverage['/lconn/jscover.js'].lineData[86]++;
  ;
  _$jscoverage['/lconn/jscover.js'].lineData[96]++;
  function write(obj) {
    _$jscoverage['/lconn/jscover.js'].functionData[2]++;
    _$jscoverage['/lconn/jscover.js'].lineData[97]++;
    if (visit6321_97_1(!obj)) {
      _$jscoverage['/lconn/jscover.js'].lineData[98]++;
      return null;
    }
    _$jscoverage['/lconn/jscover.js'].lineData[99]++;
    var uri = "";
    _$jscoverage['/lconn/jscover.js'].lineData[100]++;
    if (visit6322_100_1(obj.scheme)) {
      _$jscoverage['/lconn/jscover.js'].lineData[101]++;
      uri += obj.scheme + ":";
    }
    _$jscoverage['/lconn/jscover.js'].lineData[103]++;
    if (visit6323_103_1(obj.authority)) {
      _$jscoverage['/lconn/jscover.js'].lineData[104]++;
      uri += "//" + obj.authority;
    }
    _$jscoverage['/lconn/jscover.js'].lineData[106]++;
    uri += obj.path;
    _$jscoverage['/lconn/jscover.js'].lineData[107]++;
    if (visit6324_107_1(obj.queryParameters)) {
      _$jscoverage['/lconn/jscover.js'].lineData[108]++;
      uri += writeParameters(obj.queryParameters);
    } else {
      _$jscoverage['/lconn/jscover.js'].lineData[109]++;
      if (visit6325_109_1(obj.query)) {
        _$jscoverage['/lconn/jscover.js'].lineData[110]++;
        uri += (visit6326_110_1((visit6327_110_2(obj.query.charAt(0) != "?"))) ? "?" : "") + obj.query;
      }
    }
    _$jscoverage['/lconn/jscover.js'].lineData[111]++;
    if (visit6328_111_1(obj.fragment)) {
      _$jscoverage['/lconn/jscover.js'].lineData[112]++;
      uri += "#" + obj.fragment;
    }
    _$jscoverage['/lconn/jscover.js'].lineData[114]++;
    return uri;
  }
  _$jscoverage['/lconn/jscover.js'].lineData[117]++;
  dojo._Url.prototype.toCanonicalString = function toCanonicalString_$8() {
  _$jscoverage['/lconn/jscover.js'].functionData[3]++;
  _$jscoverage['/lconn/jscover.js'].lineData[118]++;
  return write(this);
};
  _$jscoverage['/lconn/jscover.js'].lineData[132]++;
  function rewrite(url, p) {
    _$jscoverage['/lconn/jscover.js'].functionData[4]++;
    _$jscoverage['/lconn/jscover.js'].lineData[133]++;
    if (visit6329_133_1(url && p)) {
      _$jscoverage['/lconn/jscover.js'].lineData[134]++;
      url = parse(url);
      _$jscoverage['/lconn/jscover.js'].lineData[135]++;
      dojo.mixin(url.queryParameters, p);
      _$jscoverage['/lconn/jscover.js'].lineData[136]++;
      url = write(url);
    }
    _$jscoverage['/lconn/jscover.js'].lineData[138]++;
    return url;
  }
  _$jscoverage['/lconn/jscover.js'].lineData[152]++;
  function splitQuery(query) {
    _$jscoverage['/lconn/jscover.js'].functionData[5]++;
    _$jscoverage['/lconn/jscover.js'].lineData[153]++;
    var params = {};
    _$jscoverage['/lconn/jscover.js'].lineData[154]++;
    if (visit6330_154_1(!query)) {
      _$jscoverage['/lconn/jscover.js'].lineData[155]++;
      return params;
    }
    _$jscoverage['/lconn/jscover.js'].lineData[156]++;
    if (visit6331_156_1(query.charAt(0) == "?")) {
      _$jscoverage['/lconn/jscover.js'].lineData[157]++;
      query = query.substring(1);
    }
    _$jscoverage['/lconn/jscover.js'].lineData[159]++;
    var args = query.split("&");
    _$jscoverage['/lconn/jscover.js'].lineData[160]++;
    for (var i = 0; visit6332_160_1(i < args.length); i++) {
      _$jscoverage['/lconn/jscover.js'].lineData[161]++;
      if (visit6333_161_1(args[i].length > 0)) {
        _$jscoverage['/lconn/jscover.js'].lineData[162]++;
        var separator = args[i].indexOf("=");
        _$jscoverage['/lconn/jscover.js'].lineData[163]++;
        if (visit6334_163_1(separator == -1)) {
          _$jscoverage['/lconn/jscover.js'].lineData[164]++;
          var key = decodeURIComponent(args[i]);
          _$jscoverage['/lconn/jscover.js'].lineData[165]++;
          var existing = params[key];
          _$jscoverage['/lconn/jscover.js'].lineData[166]++;
          if (visit6335_166_1(dojo.isArray(existing))) {
            _$jscoverage['/lconn/jscover.js'].lineData[167]++;
            existing.push("");
          } else {
            _$jscoverage['/lconn/jscover.js'].lineData[168]++;
            if (visit6336_168_1(existing)) {
              _$jscoverage['/lconn/jscover.js'].lineData[169]++;
              params[key] = [existing, ""];
            } else {
              _$jscoverage['/lconn/jscover.js'].lineData[174]++;
              params[key] = "";
            }
          }
        } else {
          _$jscoverage['/lconn/jscover.js'].lineData[176]++;
          if (visit6337_176_1(separator > 0)) {
            _$jscoverage['/lconn/jscover.js'].lineData[177]++;
            var key = decodeURIComponent(args[i].substring(0, separator));
            _$jscoverage['/lconn/jscover.js'].lineData[178]++;
            var value = decodeURIComponent(args[i].substring(separator + 1));
            _$jscoverage['/lconn/jscover.js'].lineData[179]++;
            var existing = params[key];
            _$jscoverage['/lconn/jscover.js'].lineData[180]++;
            if (visit6338_180_1(dojo.isArray(existing))) {
              _$jscoverage['/lconn/jscover.js'].lineData[181]++;
              existing.push(value);
            } else {
              _$jscoverage['/lconn/jscover.js'].lineData[182]++;
              if (visit6339_182_1(existing)) {
                _$jscoverage['/lconn/jscover.js'].lineData[183]++;
                params[key] = [existing, value];
              } else {
                _$jscoverage['/lconn/jscover.js'].lineData[188]++;
                params[key] = value;
              }
            }
          }
        }
      }
    }
    _$jscoverage['/lconn/jscover.js'].lineData[191]++;
    return params;
  }
  _$jscoverage['/lconn/jscover.js'].lineData[193]++;
  ;
  _$jscoverage['/lconn/jscover.js'].lineData[205]++;
  function getRequestParameters(uri) {
    _$jscoverage['/lconn/jscover.js'].functionData[6]++;
    _$jscoverage['/lconn/jscover.js'].lineData[206]++;
    if (visit6340_206_1(!uri)) {
      _$jscoverage['/lconn/jscover.js'].lineData[207]++;
      return {};
    }
    _$jscoverage['/lconn/jscover.js'].lineData[208]++;
    if (visit6341_208_1(typeof uri == "string")) {
      _$jscoverage['/lconn/jscover.js'].lineData[209]++;
      uri = new dojo._Url(uri);
    }
    _$jscoverage['/lconn/jscover.js'].lineData[210]++;
    return splitQuery(uri.query);
  }
  _$jscoverage['/lconn/jscover.js'].lineData[212]++;
  ;
  _$jscoverage['/lconn/jscover.js'].lineData[224]++;
  function writeParameters(map) {
    _$jscoverage['/lconn/jscover.js'].functionData[7]++;
    _$jscoverage['/lconn/jscover.js'].lineData[225]++;
    var out = [];
    _$jscoverage['/lconn/jscover.js'].lineData[226]++;
    for (var key in map) {
      _$jscoverage['/lconn/jscover.js'].lineData[227]++;
      var values = map[key];
      _$jscoverage['/lconn/jscover.js'].lineData[228]++;
      if (visit6342_228_1(visit6343_228_2(typeof values != "undefined") && visit6344_228_3(values != null))) {
        _$jscoverage['/lconn/jscover.js'].lineData[229]++;
        key = encodeURIComponent(key);
        _$jscoverage['/lconn/jscover.js'].lineData[230]++;
        if (visit6345_230_1(dojo.isArray(values))) {
          _$jscoverage['/lconn/jscover.js'].lineData[231]++;
          for (var i = 0; visit6346_231_1(i < values.length); i++) {
            _$jscoverage['/lconn/jscover.js'].lineData[232]++;
            if (visit6347_232_1(values[i])) {
              _$jscoverage['/lconn/jscover.js'].lineData[233]++;
              out.push(visit6348_233_1(out.length == 0) ? "?" : "&");
              _$jscoverage['/lconn/jscover.js'].lineData[234]++;
              out.push(key);
              _$jscoverage['/lconn/jscover.js'].lineData[235]++;
              out.push("=");
              _$jscoverage['/lconn/jscover.js'].lineData[236]++;
              out.push(encodeURIComponent(values[i]));
            }
          }
        } else {
          _$jscoverage['/lconn/jscover.js'].lineData[240]++;
          out.push(visit6349_240_1(out.length == 0) ? "?" : "&");
          _$jscoverage['/lconn/jscover.js'].lineData[241]++;
          out.push(key);
          _$jscoverage['/lconn/jscover.js'].lineData[242]++;
          out.push("=");
          _$jscoverage['/lconn/jscover.js'].lineData[243]++;
          out.push(encodeURIComponent(values));
        }
      }
    }
    _$jscoverage['/lconn/jscover.js'].lineData[247]++;
    return out.join("");
  }
  _$jscoverage['/lconn/jscover.js'].lineData[249]++;
  ;
  _$jscoverage['/lconn/jscover.js'].lineData[265]++;
  function getServiceUrl(svcRefConfig, secure) {
    _$jscoverage['/lconn/jscover.js'].functionData[8]++;
    _$jscoverage['/lconn/jscover.js'].lineData[266]++;
    var svcUrl = null;
    _$jscoverage['/lconn/jscover.js'].lineData[269]++;
    if (visit6350_269_1(!svcRefConfig)) {
      _$jscoverage['/lconn/jscover.js'].lineData[270]++;
      return null;
    } else {
      _$jscoverage['/lconn/jscover.js'].lineData[273]++;
      if (visit6351_273_1(secure_ || secure)) {
        _$jscoverage['/lconn/jscover.js'].lineData[274]++;
        if (visit6352_274_1(svcRefConfig.secureEnabled)) {
          _$jscoverage['/lconn/jscover.js'].lineData[275]++;
          svcUrl = svcRefConfig.secureUrl;
        } else {
          _$jscoverage['/lconn/jscover.js'].lineData[277]++;
          if (visit6353_277_1(svcRefConfig.url)) {
            _$jscoverage['/lconn/jscover.js'].lineData[278]++;
            svcUrl = svcRefConfig.url;
          } else {
            _$jscoverage['/lconn/jscover.js'].lineData[281]++;
            return null;
          }
        }
      } else {
        _$jscoverage['/lconn/jscover.js'].lineData[286]++;
        if (visit6354_286_1(svcRefConfig.url)) {
          _$jscoverage['/lconn/jscover.js'].lineData[287]++;
          svcUrl = svcRefConfig.url;
        } else {
          _$jscoverage['/lconn/jscover.js'].lineData[289]++;
          if (visit6355_289_1(svcRefConfig.secureEnabled)) {
            _$jscoverage['/lconn/jscover.js'].lineData[290]++;
            svcUrl = svcRefConfig.secureUrl;
          } else {
            _$jscoverage['/lconn/jscover.js'].lineData[293]++;
            return null;
          }
        }
      }
    }
    _$jscoverage['/lconn/jscover.js'].lineData[297]++;
    return new Url(svcUrl);
  }
  _$jscoverage['/lconn/jscover.js'].lineData[299]++;
  ;
  _$jscoverage['/lconn/jscover.js'].lineData[315]++;
  function ensureQualified(urlStr) {
    _$jscoverage['/lconn/jscover.js'].functionData[9]++;
    _$jscoverage['/lconn/jscover.js'].lineData[316]++;
    if (visit6356_316_1(!urlStr)) {
      _$jscoverage['/lconn/jscover.js'].lineData[317]++;
      throw "Null URL is not permitted";
    }
    _$jscoverage['/lconn/jscover.js'].lineData[319]++;
    return new dojo._Url(dojo.global.location.toString(), urlStr).toString();
  }
  _$jscoverage['/lconn/jscover.js'].lineData[321]++;
  ;
  _$jscoverage['/lconn/jscover.js'].lineData[347]++;
  function canonicalize(url, comp) {
    _$jscoverage['/lconn/jscover.js'].functionData[10]++;
    _$jscoverage['/lconn/jscover.js'].lineData[348]++;
    var _u = parse(url);
    _$jscoverage['/lconn/jscover.js'].lineData[349]++;
    var _c = visit6357_349_1(comp || ibmConfig.serviceName);
    _$jscoverage['/lconn/jscover.js'].lineData[350]++;
    switch (_c) {
      case "wikis":
        _$jscoverage['/lconn/jscover.js'].lineData[352]++;
        if (visit6358_352_1(_u.fragment && visit6359_352_2(_u.fragment.indexOf("!") === 0))) {
          _$jscoverage['/lconn/jscover.js'].lineData[353]++;
          _u.fragment = _u.fragment.substr(1);
        }
      case "files":
        _$jscoverage['/lconn/jscover.js'].lineData[357]++;
        if (visit6360_357_1(_u.fragment)) {
          _$jscoverage['/lconn/jscover.js'].lineData[358]++;
          _u.path += _u.fragment;
          _$jscoverage['/lconn/jscover.js'].lineData[359]++;
          delete _u.fragment;
        }
        _$jscoverage['/lconn/jscover.js'].lineData[361]++;
        break;
    }
    _$jscoverage['/lconn/jscover.js'].lineData[363]++;
    return _u.toCanonicalString();
  }
  _$jscoverage['/lconn/jscover.js'].lineData[365]++;
  ;
  _$jscoverage['/lconn/jscover.js'].lineData[367]++;
  return {
  parse: parse, 
  write: write, 
  rewrite: rewrite, 
  splitQuery: splitQuery, 
  getRequestParameters: getRequestParameters, 
  writeParameters: writeParameters, 
  ensureQualified: ensureQualified, 
  getServiceUrl: getServiceUrl, 
  canonicalize: canonicalize, 
  secure: secure_};
});
