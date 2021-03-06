import SkinPersonaPiece from './SkinPersonaPiece';
import SkinPersonaPieceTintColor from './SkinPersonaPieceTintColor';

export default class SkinPersona {
    private pieces: Set<SkinPersonaPiece> = new Set();
    private tintColors: Set<SkinPersonaPieceTintColor> = new Set();

    public getPieces(): Set<SkinPersonaPiece> {
        return this.pieces;
    }

    public getTintColors(): Set<SkinPersonaPieceTintColor> {
        return this.tintColors;
    }
}
