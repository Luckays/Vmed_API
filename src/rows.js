let parsedLines = [];
export default (split,number) => {


    let date = new Date();
    date.setFullYear(split[0], (split[1] - 1), split[2]);
    date.setHours(split[3], split[4], split[5]);
    let s7 = split[6];
    let s8 = split[7];
    let s9 = split[8];
    let s10 = split[9];
    let s11 = split[10];
    let s12 = split[11];
    let s13 = split[12];
    let s14 = split[13];
    let s15 = split[14];
    let s16 = split[15];
    let s17 = split[16];
    let s18 = split[17];
    let s19 = split[18];
    let s20 = split[19];
    let s21 = split[20];
    let s22 = split[21];
    let s23 = split[22];
    let s24 = split[23];
    let s25 = split[24];
    let s26 = split[25];
    let s27 = split[26];
    let s28 = split[27];
    let s29 = split[28];
    let s30 = split[29];
    let s31 = split[30];
    let s32 = split[31];
    let s33 = split[32];
    let s34 = split[33];
    let s35 = split[34];
    let s36 = split[35];
    let s37 = split[36];
    let s38 = split[37];
    let s39 = split[38];
    let s40 = split[39];

    switch(number){
        case (number<=6):
            throw Error('Unsupported number of rows ' + number)
        case 7:
            parsedLines = ({date,s7});
        break;
        case 8:
            parsedLines = ({date,s7,s8});
            break;
        case 9:
            parsedLines = ({date,s7,s8,s9});
            break;
        case 10:
            parsedLines = ({date,s7,s8,s9,s10});
            break;
        case 11:
            parsedLines = ({date,s7,s8,s9,s10,s11});
            break;
        case 12:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12});

            break;
        case 13:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13});
            break;
        case 14:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14});
            break;
        case 15:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15});
            break;
        case 16:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16});
            break;
        case 17:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17});
            break;
        case 18:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18});
            break;
        case 19:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19});
            break;
        case 20:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20});
            break;
        case 21:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21});
            break;
        case 22:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22});
            break;
        case 23:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23});
            break;
        case 24:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23,s24});
            break;
        case 25:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23,s24,s25});
            break;
        case 26:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23,s24,s25,s26});
            break;
        case 27:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23,s24,s25,s26,s27});
            break;
        case 28:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23,s24,s25,s26,s27,s28});
            break;
        case 29:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23,s24,s25,s26,s27,s28,s29});
            break;
        case 30:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23,s24,s25,s26,s27,s28,s29,s30});
            break;
        case 31:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23,s24,s25,s26,s27,s28,s29,s30,s31});
            break;
        case 32:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23,s24,s25,s26,s27,s28,s29,s30,s31,s32});
            break;
        case 33:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23,s24,s25,s26,s27,s28,s29,s30,s31,s32,s33});
            break;
        case 34:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23,s24,s25,s26,s27,s28,s29,s30,s31,s32,s33,s34});
            break;
        case 35:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23,s24,s25,s26,s27,s28,s29,s30,s31,s32,s33,s34,s35});
            break;
        case 36:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23,s24,s25,s26,s27,s28,s29,s30,s31,s32,s33,s34,s35,s36});
            break;
        case 37:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23,s24,s25,s26,s27,s28,s29,s30,s31,s32,s33,s34,s35,s36,s37});
            break;
        case 38:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23,s24,s25,s26,s27,s28,s29,s30,s31,s32,s33,s34,s35,s36,s37,s38});
            break;
        case 39:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23,s24,s25,s26,s27,s28,s29,s30,s31,s32,s33,s34,s35,s36,s37,s38,s39});
            break;
        case 40:
            parsedLines = ({date,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23,s24,s25,s26,s27,s28,s29,s30,s31,s32,s33,s34,s35,s36,s37,s38,s39,s40});
            break;


    }
console.log(parsedLines)
return parsedLines


}