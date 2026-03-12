export interface Project {
    id: string;
    name: string;
    department: string;
    status: 'active' | 'completed' | 'on-hold';
    budget: number;
    deadline: string;
}
