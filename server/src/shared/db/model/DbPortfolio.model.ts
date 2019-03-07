import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { CryptoCurrency } from '../../../currency/currency.service';

@Table({
    tableName: 'portfolio',
    timestamps: true
})
export class DbPortfolio extends Model<DbPortfolio> {
    @Column({
        type: DataType.UUID,
        autoIncrement: true,
        primaryKey: true
    })
    id!: string;

    @Column({
        type: DataType.STRING
    })
    name!: string;

    @Column({
        type: DataType.ARRAY({ type: DataType.JSON }),
        allowNull: false,
        defaultValue: []
    })
    cryptoCurrencies!: CryptoCurrency[];
}
