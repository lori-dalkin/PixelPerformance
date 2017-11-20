/**
 * Created by saman on 2017-11-19.
 */
import {Electronic} from "../Models/electronic";

export abstract class ModelFilterProductStrategy{

    public abstract filterProduct(products: Electronic[], data): Electronic[];

}
