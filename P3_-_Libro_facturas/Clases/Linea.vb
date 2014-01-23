Public MustInherit Class Linea
    'Atributos
    Private dbTotal As Double
    Private sDesc As String

    'Constructor
    Public Sub New(ByVal sDesc As String, ByVal dbTotal As Double)
        Me.sDesc = sDesc
        Me.dbTotal = dbTotal
    End Sub
    'Propiedades
    Public ReadOnly Property Descripcion() As String
        Get
            Return Me.sDesc
        End Get

    End Property

    Public ReadOnly Property Total() As Double
        Get
            Return Me.dbTotal
        End Get

    End Property

End Class
