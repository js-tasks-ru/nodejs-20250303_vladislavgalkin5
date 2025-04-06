import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Task {

    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number

    @Column({ 
        type: 'varchar', 
        length: 50 
    })
    title: string

    @Column({ 
        type: 'varchar', 
        length: 120 
    })
    description: string

    @Column({ 
        type: 'boolean',
        default: false
    })
    isCompleted: boolean
}
