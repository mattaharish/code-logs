var convert = require('xml-js');
const xml = {
  content:
    '<?xml version="1.0" encoding="UTF-8"?>\r\n' +
    '<!DOCTYPE CaseManagementOrderStatus SYSTEM "https://zohotest.zoho.com/zoho/reports/dtd/cmorderstatus_1_1.dtd">\r\n' +
    '\r\n' +
    '<CaseManagementOrderStatus xmlns="http://reports.zoho.com/reports/cmos/1.0" MerchantID="coding_knights" Name="Case Management Order Status" Date="2090-03-15 09:33:35 GMT" Version="1.1">\r\n' +
    '  <Update MerchantReferenceNumber="962cda75-7f2a-451b-862b-1b6175224138" RequestID="58694319139606">\r\n' +
    '    <OriginalDecision>REVIEW</OriginalDecision>\r\n' +
    '    <NewDecision>REJECT</NewDecision>\r\n' +
    '    <Reviewer>system</Reviewer>\r\n' +
    '    <Notes>\r\n' +
    '      <Note Date="2020-04-15 09:33:34" AddedBy="system" Comment="Took ownership." />\r\n' +
    '    </Notes>\r\n' +
    '    <Queue>Inactive Queue 1</Queue>\r\n' +
    '    <Profile>TEST</Profile>\r\n' +
    '  </Update>\r\n' +
    '</CaseManagementOrderStatus>\r\n' +
    '\r\n',
};

console.log(xml.content);

var result1 = convert.xml2json(xml.content, {compact: true, spaces: 2});

console.log(result1);

console.log(JSON.parse(result1).CaseManagementOrderStatus.Update._attributes);
