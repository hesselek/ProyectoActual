Public Class LServ
    Inherits Linea

    'Atributos

    Private dbPrecServ As Double

    'Constructor

    Public Sub New(ByVal sDesc As String, ByVal dbPrecio As Double)
        MyBase.New(sDesc, dbPrecio)
        Me.dbPrecServ = dbPrecio
    End Sub

    'Propiedades

    Public ReadOnly Property Precio() As Double
        Get
            Return Me.dbPrecServ
        End Get

    End Property

    'Metodos

    Public Overrides Function ToString() As String
        Dim sCad As String

        sCad = Me.Descripcion.PadRight(25)
        sCad &= Me.Precio.ToString("0.00").PadLeft(6) & Space(4)
        sCad &= Me.Total.ToString("0.00 Eur").PadLeft(21)

        Return sCad


    End Function

End Class

