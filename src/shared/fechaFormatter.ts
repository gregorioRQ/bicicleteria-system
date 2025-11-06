// Formatear fechas para MySQL
    const formatearFecha = (fecha: Date | undefined): string | null => {
        if (!fecha) return null;
        const d = fecha instanceof Date ? fecha : new Date(fecha);
        return d.toISOString().slice(0, 19).replace('T', ' ');
    };

export default formatearFecha;