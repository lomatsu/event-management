import { PlaceViewModel } from "../../view-model/PlaceViewModel"
import { ModelBase } from "./Base"

export class PlaceModel extends ModelBase {
	name: string
  total_amount: number

	constructor(params: PlaceViewModel) {
		super(params)
		this.name = params.name
		this.total_amount = params.totalAmount
	}
}
