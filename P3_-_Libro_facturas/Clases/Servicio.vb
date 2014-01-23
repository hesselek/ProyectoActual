Public Class Servicio
    'Atributos
    Private sDescripcion As String
    Private dbPrecio As Double

    'Constructor
    Public Sub New(ByVal sDesc As String, ByVal dbPrec As Double)
        Me.Descripcion = sDesc
        Me.Precio = dbPrec
    End Sub
    'Propiedades
    Public Property Descripcion() As String
        Get
            Return Me.sDescripcion
        End Get
        Set(ByVal value As String)
            Me.sDescripcion = value
        End Set
    End Property

    Public Property Precio() As Double
        Get
            Return Me.dbPrecio
        End Get
        Set(ByVal value As Double)
            Me.dbPrecio = value
        End Set
    End Property
End Class