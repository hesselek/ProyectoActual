Public Class LProd
    Inherits Linea

    'Atributos

    Private dbPrecUnit As Double
    Private iUnid As Integer

    'Constructor
    Public Sub New(ByVal sDesc As String, ByVal dbPrecio As Double, ByVal iUnid As Integer)
        MyBase.New(sDesc, dbPrecio * iUnid)
        Me.iUnid = iUnid
        Me.dbPrecUnit = dbPrecio
    End Sub

    'Propiedades

    Public Property PrecioUnitario() As Double
        Get
            Return Me.dbPrecUnit
        End Get
        Set(ByVal value As Double)
            Me.dbPrecUnit = value
        End Set
    End Property

    Public Property Unidades() As Integer
        Get
            Return Me.iUnid
        End Get
        Set(ByVal value As Integer)
            Me.iUnid = value
        End Set
    End Property

    'Metodos
    Public Overrides Function ToString() As String
        Dim sCad As String

        sCad = Me.Descripcion.PadRight(25)
        sCad &= Me.PrecioUnitario.ToString("0.00").PadLeft(6) & Space(4)
        sCad &= Me.Unidades.ToString.PadLeft(8) & Space(2)
        sCad &= Me.Total.ToString("0.00 Eur").PadLeft(11)

        Return sCad


    End Function

End Class
