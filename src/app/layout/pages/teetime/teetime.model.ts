export class TeeSlot {
    id: string;
    slotId: string;
    date: string;
    slotStartTime: string;
    slotEndTime: string;
    isBooked: boolean;
    resourceId: string;
    slotType: string;
    isFocused?: boolean = false;
}

export class BookTeeSlot {
    slotId: string;
    bookedby: string;
    resourceId: string;
    eventDate: Date;
    members: string[];
}

export const TBOXLIST: any[] = [
    {
        "resourceId": "f03e40a0-6889-11e8-881b-9d116b3528b1",
        "resourceName": "TBox 1"
    },
    {
        "resourceId": "f03e40a0-6889-11e8-881b-9d116b3528b2",
        "resourceName": "TBox 10"
    }
]

// export const TEESLOTLIST: TeeSlot[] = [
//     {
//         "slotId": "1",
//         "slotStartTime": "08:00 am",
//         "slotEndTime": "08:30 am",
//         "isBooked": false,
//         "slotType": "normal"
//     },
//     {
//         "slotId": "1",
//         "slotStartTime": "08:30 am",
//         "slotEndTime": "09:00 am",
//         "isBooked": false,
//         "slotType": "normal"
//     },
//     {
//         "slotId": "1",
//         "slotStartTime": "09:00 am",
//         "slotEndTime": "09:30 am",
//         "isBooked": false,
//         "slotType": "normal"
//     },
//     {
//         "slotId": "1",
//         "slotStartTime": "09:30 am",
//         "slotEndTime": "10:00 am",
//         "isBooked": false,
//         "slotType": "normal"
//     },
//     {
//         "slotId": "1",
//         "slotStartTime": "10:00 am",
//         "slotEndTime": "10:30 am",
//         "isBooked": false,
//         "slotType": "normal"
//     },
//     {
//         "slotId": "1",
//         "slotStartTime": "10:30 am",
//         "slotEndTime": "11:00 am",
//         "isBooked": false,
//         "slotType": "normal"
//     },
//     {
//         "slotId": "1",
//         "slotStartTime": "11:00 am",
//         "slotEndTime": "11:30 am",
//         "isBooked": false,
//         "slotType": "normal"
//     },
//     {
//         "slotId": "1",
//         "slotStartTime": "11:30 am",
//         "slotEndTime": "12:00 pm",
//         "isBooked": false,
//         "slotType": "normal"
//     },
//     {
//         "slotId": "1",
//         "slotStartTime": "12:00 pm",
//         "slotEndTime": "12:30 pm",
//         "isBooked": false,
//         "slotType": "normal"
//     },
//     {
//         "slotId": "1",
//         "slotStartTime": "12:30 pm",
//         "slotEndTime": "01:00 pm",
//         "isBooked": false,
//         "slotType": "normal"
//     },
//     {
//         "slotId": "1",
//         "slotStartTime": "01:00 pm",
//         "slotEndTime": "01:30 pm",
//         "isBooked": false,
//         "slotType": "normal"
//     },
//     {
//         "slotId": "1",
//         "slotStartTime": "01:30 pm",
//         "slotEndTime": "02:00 pm",
//         "isBooked": false,
//         "slotType": "normal"
//     },
//     {
//         "slotId": "1",
//         "slotStartTime": "02:00 pm",
//         "slotEndTime": "02:30 pm",
//         "isBooked": false,
//         "slotType": "normal"
//     },
//     {
//         "slotId": "1",
//         "slotStartTime": "02:30 pm",
//         "slotEndTime": "03:00 pm",
//         "isBooked": false,
//         "slotType": "normal"
//     },
//     {
//         "slotId": "1",
//         "slotStartTime": "03:00 pm",
//         "slotEndTime": "03:30 pm",
//         "isBooked": false,
//         "slotType": "normal"
//     },
//     {
//         "slotId": "1",
//         "slotStartTime": "03:30 pm",
//         "slotEndTime": "04:00 pm",
//         "isBooked": false,
//         "slotType": "normal"
//     }
// ];

export const MEMBERLIST = [
    {
        "memberId": "1",
        "memberName": "Manohar G",
        "memberRank": "02",
        "memberPhoneNo": "9874654135"
    },
    {
        "memberId": "2",
        "memberName": "Siddharth",
        "memberRank": "05",
        "memberPhoneNo": "8741451344"
    },
    {
        "memberId": "3",
        "memberName": "Sriram J",
        "memberRank": "04",
        "memberPhoneNo": "7787883457"
    },
    {
        "memberId": "5",
        "memberName": "Srinivas B",
        "memberRank": "03",
        "memberPhoneNo": "71324781214"
    },
    {
        "memberId": "6",
        "memberName": "Akhilesh V",
        "memberRank": "04",
        "memberPhoneNo": "7845784574"
    },
    {
        "memberId": "7",
        "memberName": "Paran T",
        "memberRank": "08",
        "memberPhoneNo": "7787457877"
    },
    {
        "memberId": "8",
        "memberName": "Nishanth R",
        "memberRank": "09",
        "memberPhoneNo": "7847825132"
    },
    {
        "memberId": "9",
        "memberName": "Raushan K",
        "memberRank": "10",
        "memberPhoneNo": "5478512378"
    },
    {
        "memberId": "10",
        "memberName": "Sankar A",
        "memberRank": "11",
        "memberPhoneNo": "87513215477"
    },
    {
        "memberId": "11",
        "memberName": "Rambabu Y",
        "memberRank": "01",
        "memberPhoneNo": "9874547541"
    },
    {
        "memberId": "11",
        "memberName": "Shivateja A",
        "memberRank": "01",
        "memberPhoneNo": "9874547541"
    },
    {
        "memberId": "12",
        "memberName": "Sandeep Y",
        "memberRank": "01",
        "memberPhoneNo": "7847825132"
    },
    {
        "memberId": "13",
        "memberName": "Bhaskar N",
        "memberRank": "10",
        "memberPhoneNo": "5478512378"
    },
    {
        "memberId": "14",
        "memberName": "Gangadhar P",
        "memberRank": "11",
        "memberPhoneNo": "87513215477"
    },
    {
        "memberId": "15",
        "memberName": "Rohith P",
        "memberRank": "01",
        "memberPhoneNo": "9874547541"
    },
    {
        "memberId": "15",
        "memberName": "Punith P",
        "memberRank": "01",
        "memberPhoneNo": "9874547541"
    },
    {
        "memberId": "15",
        "memberName": "Sairam S",
        "memberRank": "12",
        "memberPhoneNo": "9874547541"
    }, {
        "memberId": "16",
        "memberName": "Satish B",
        "memberRank": "04",
        "memberPhoneNo": "9874547541"
    }
]