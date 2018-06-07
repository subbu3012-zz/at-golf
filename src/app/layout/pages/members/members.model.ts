export class Member {
    id: string;
    firstName: string;
    lastName: string;
    memberId: string;
    email: string;
    phone: string;
}

export class MemberGroup {
    groupId: string;
    groupName: string;
    members: Member[];
}

